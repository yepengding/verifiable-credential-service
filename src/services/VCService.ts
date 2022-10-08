import {Service} from 'typedi';
import {getVCRepository} from "../repositories/VCRepository";
import {VC} from "../models/entities/VC";
import {VCDoc} from "../models/dtos/VC.dto";
import {ContextUtil} from "../util/ContextUtil";
import {env} from "../common/env";
import * as jose from 'jose';
import {JWK} from 'jose';
import crypto from "crypto";

/**
 * Verifiable Credential Service
 *
 * @author Yepeng Ding
 */
@Service()
export class VCService {

    public async findAll(): Promise<VC[]> {
        return (await getVCRepository()).find();
    }

    public async retrieve(id: number): Promise<VC | null> {
        return (await getVCRepository()).findOneBy({id});
    }

    public async create(vc: VC): Promise<VC> {
        return (await getVCRepository()).save(vc);
    }

    public async update(vc: VC): Promise<VC> {
        return (await getVCRepository()).save(vc);
    }

    /**
     * Create proof for a given VC document
     *
     * @param vcDoc VC document
     * @param privateKey private assertion key (JWK string)
     * @return proof value and proof date
     */
    public async createProof(vcDoc: VCDoc, privateKey: string): Promise<{ proofValue: string, proofDate: Date }> {
        // EdDSA (Ed25519) at default
        const algorithm = 'EdDSA';
        const sk = await jose.importJWK(JSON.parse(privateKey) as JWK, algorithm);

        return {
            proofValue: await new jose.CompactSign(new TextEncoder().encode(this.getHashValue(vcDoc)))
                .setProtectedHeader({alg: algorithm})
                .sign(sk),
            proofDate: new Date()
        }
    }

    /**
     * Verify VC Document.
     *
     * @param vcDoc VC document
     * @param publicKey public key
     * @return true if proof is correct.
     */
    public async verifyVCDoc(vcDoc: VCDoc, publicKey: string): Promise<boolean> {
        // Get public singing key
        const algorithm = 'EdDSA';
        const pk = await jose.importJWK(JSON.parse(publicKey) as JWK, algorithm);

        // Get proof value
        const proofValue = vcDoc.proof?.proofValue as string;

        // Delete proof
        delete vcDoc.proof;

        // Parse proof value
        const {payload} = await jose.compactVerify(proofValue, pk);

        // Get payload string (credential hash value)
        const payloadStr = new TextDecoder().decode(payload);

        // Judge if hash values are equal
        return this.getHashValue(vcDoc) === payloadStr;
    }

    /**
     * Resolve VC to VC Document
     *
     * @param vc
     * @param withProof with proof
     * @return VC document
     */
    public resolveVCToDoc(vc: VC, withProof = true): VCDoc {
        const vcDoc = new VCDoc();
        // Set default VC contexts
        vcDoc.context = ContextUtil.defaultContextOfVC();

        vcDoc.id = `${env.app.endpoint}/vc/${vc.id}`;

        // Set default VC type
        vcDoc.type = ["VerifiableCredential"];

        vcDoc.issuer = vc.issuer;

        vcDoc.issuanceDate = vc.createdAt.toISOString();

        vcDoc.credentialSubject = {
            id: vc.subject,
            claim: vc.claim
        };

        if (withProof) {
            vcDoc.proof = {
                type: "Ed25519Signature2020",
                created: vc.proofCreatedAt?.toISOString(),
                verificationMethod: `${env.vdr.endpoint}/did/${vc.issuer}#${vc.kid}`,
                proofPurpose: "assertionMethod",
                proofValue: vc.proofValue
            };
        }

        return vcDoc;
    }

    /**
     * Resolve a given VC document string to VC document
     *
     * @param vcDocString VC document string
     * @return VC document
     */
    public resolveDocStringToDoc(vcDocString: string): VCDoc {
        return JSON.parse(vcDocString) as VCDoc;
    }

    /**
     * Get the hash value of a given VC document
     *
     * @param vcDoc VC document
     * @return hash value
     */
    public getHashValue(vcDoc: VCDoc): string {
        return crypto.createHash('sha256').update(JSON.stringify(vcDoc)).digest('hex');
    }

}
