import {Service} from 'typedi';
import {getVCRepository} from "../repositories/VCRepository";
import {VC} from "../models/entities/VC";
import {VCDoc} from "../models/dtos/VC.dto";
import {ContextUtil} from "../util/ContextUtil";
import {env} from "../common/env";

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
     * Resolve VC to VC Document
     *
     * @param vc
     * @param withProof with proof
     */
    public resolveVCtoDoc(vc: VC, withProof = true): VCDoc {
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

}
