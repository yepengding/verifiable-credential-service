import {Service} from 'typedi';
import {VCRepository} from "../repositories/VCRepository";
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
        return await VCRepository.find();
    }

    public async retrieve(id: number): Promise<VC | null> {
        return await VCRepository.findOneBy({id});
    }

    public async create(vc: VC): Promise<VC> {
        return await VCRepository.save(vc);
    }

    /**
     * Resolve VC to VC Document
     *
     * @param vc
     */
    public resolveVCtoDoc(vc: VC): VCDoc {
        const vcDoc = new VCDoc();
        // Set default VC contexts
        vcDoc.context = ContextUtil.defaultContextOfVC();

        // TODO Add REST API to resolve ID
        vcDoc.id = `${env.app.endpoint}/vc/${vc.id}`;

        // Set default VC type
        vcDoc.type = ["VerifiableCredential"];

        vcDoc.issuer = vc.issuer;

        vcDoc.issuanceDate = vc.createdAt.toISOString();

        vcDoc.credentialSubject = {
            id: vc.subject,
            claim: vc.claim
        };

        return vcDoc;
    }

}
