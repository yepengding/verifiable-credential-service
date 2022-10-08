import {Service} from "typedi";
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {VCService} from "../services/VCService";
import {VC} from "../models/entities/VC";
import {Assert} from "../common/assertion/Assert";
import {CreateVCReq, VCDoc, VerifyVCDocStringReq} from "../models/dtos/VC.dto";

/**
 * VC Resolver
 *
 * @author Yepeng Ding
 */
@Service()
@Resolver()
export class VCResolver {

    constructor(
        private readonly vcService: VCService
    ) {
    }

    /**
     * Create Verifiable Credential
     *
     * @param createVCReq
     */
    @Mutation(() => VCDoc, {
        description: 'Create verifiable credential.',
    })
    async createVC(@Arg('createVCReq') createVCReq: CreateVCReq): Promise<VCDoc> {
        // Instantiate VC
        let vc = new VC();
        vc.issuer = createVCReq.issuer;
        vc.subject = createVCReq.subject;
        vc.claim = createVCReq.claim;
        vc.kid = createVCReq.kid;

        // Create VC in DB
        vc = await this.vcService.create(vc);

        // Resolve VC to VC document
        const vcDoc = this.vcService.resolveVCToDoc(vc, false);

        // Create proof
        const {proofValue, proofDate} = await this.vcService.createProof(vcDoc, createVCReq.privateKey);

        // Assign proof to VC
        vc.proofValue = proofValue;
        vc.proofCreatedAt = proofDate;

        // Update VC with proof
        vc = await this.vcService.update(vc);

        // Return resolved VC document
        return this.vcService.resolveVCToDoc(vc);
    }

    /**
     * Verify VC Document String Request
     * without checking issuance DB.
     *
     * @param verifyVCReq
     */
    @Query(() => Boolean, {
        description: 'Verify VC document string offline (without checking issuance DB).',
    })
    async verifyVCDocStringOffline(@Arg('verifyVCReq') verifyVCReq: VerifyVCDocStringReq): Promise<boolean> {
        const vcDoc = this.vcService.resolveDocStringToDoc(verifyVCReq.vcDocString);

        return await this.vcService.verifyVCDoc(vcDoc, verifyVCReq.publicKey);
    }

    @Query(() => VCDoc, {
        description: 'Get VC document by id',
    })
    async getVCDoc(@Arg('id') id: number): Promise<VCDoc> {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, `VC (${id}) does not exist.`);
        return this.vcService.resolveVCToDoc(<VC>vc);
    }

    @Query(() => String, {
        description: 'Resolve VC to VC document string by id',
    })
    async getVCDocString(@Arg('id') id: number): Promise<string> {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, `VC (${id}) does not exist.`);
        return JSON.stringify(this.vcService.resolveVCToDoc(<VC>vc));
    }

}
