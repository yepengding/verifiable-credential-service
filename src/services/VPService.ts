import {Service} from 'typedi';
import {VCDoc} from "../models/dtos/VC.dto";
import {ContextUtil} from "../util/ContextUtil";
import {VPDoc} from "../models/dtos/VP.dto";
import * as jose from 'jose';
import {JWK} from 'jose';
import crypto from "crypto";
import {urlOfVerificationMethod} from "../util/URLUtil";

/**
 * Verifiable Presentation Service
 *
 * @author Yepeng Ding
 */
@Service()
export class VPService {

    /**
     * Compose VP
     *
     * @param vcDoc VC documents
     * @param holder holder DID
     * @param kid assertion key identifier
     * @param privateKey private assertion key
     * @return VP document
     */
    public async composeVPDoc(vcDoc: VCDoc[], holder: string, kid: string, privateKey: string): Promise<VPDoc> {
        const vpDoc = new VPDoc();

        // Set default VC contexts
        vpDoc.context = ContextUtil.defaultContextOfVP();
        vpDoc.id = `urn:uuid:${crypto.randomUUID()}`;
        vpDoc.type = ["VerifiablePresentation"]
        vpDoc.verifiableCredential = vcDoc;
        vpDoc.holder = holder;

        // Create proof
        const {proofValue, proofDate} = await this.createProof(vpDoc, privateKey);

        vpDoc.proof = {
            type: "Ed25519Signature2020",
            created: proofDate.toISOString(),
            verificationMethod: urlOfVerificationMethod(holder, kid),
            proofPurpose: "assertionMethod",
            proofValue: proofValue
        };

        return vpDoc;
    }

    /**
     * Create proof for a given VP document
     *
     * @param vpDoc VP document
     * @param privateKey private assertion key (JWK string)
     * @return proof value and proof date
     */
    public async createProof(vpDoc: VPDoc, privateKey: string): Promise<{ proofValue: string, proofDate: Date }> {
        // EdDSA (Ed25519) at default
        const algorithm = 'EdDSA';
        const sk = await jose.importJWK(JSON.parse(privateKey) as JWK, algorithm);

        return {
            proofValue: await new jose.CompactSign(new TextEncoder().encode(this.getHashValue(vpDoc)))
                .setProtectedHeader({alg: algorithm})
                .sign(sk),
            proofDate: new Date()
        }
    }

    /**
     * Verify VP document
     *
     * @param vpDoc VP document
     * @param publicKey public key
     */
    public async verifyVPDoc(vpDoc: VPDoc, publicKey: string): Promise<boolean> {
        // Get public assertion key
        const algorithm = 'EdDSA';
        const pk = await jose.importJWK(JSON.parse(publicKey) as JWK, algorithm);

        // Get proof value
        const proofValue = vpDoc.proof?.proofValue as string;

        // Delete proof
        delete vpDoc.proof;

        // Parse proof value
        const {payload} = await jose.compactVerify(proofValue, pk);

        // Get payload string (credential hash value)
        const payloadStr = new TextDecoder().decode(payload);

        // Judge if hash values are equal
        return this.getHashValue(vpDoc) === payloadStr;
    }

    /**
     * Resolve a given VP document string to VP document
     *
     * @param vpDocString VP document string
     * @return VP document
     */
    public resolveDocStringToDoc(vpDocString: string): VPDoc {
        return JSON.parse(vpDocString) as VPDoc;
    }

    /**
     * Get the hash value of a given VP document
     *
     * @param vpDoc VP document
     * @return hash value
     */
    public getHashValue(vpDoc: VPDoc): string {
        return crypto.createHash('sha256').update(JSON.stringify(vpDoc)).digest('hex');
    }

}
