import {Service} from "typedi";
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {VCService} from "../services/VCService";
import {CreateVPByVCDocStringReq, VerifyVPDocStringReq, VPDoc} from "../models/dtos/VP.dto";
import {VPService} from "../services/VPService";

/**
 * VP Resolver
 *
 * @author Yepeng Ding
 */
@Service()
@Resolver()
export class VPResolver {

    constructor(
        private readonly vpService: VPService,
        private readonly vcService: VCService
    ) {
    }

    /**
     * Create Verifiable Presentation by VC Document String
     *
     * @param createVPReq
     */
    @Mutation(() => VPDoc, {
        description: 'Create VP by VC document string.',
    })
    async createVPByVCDocString(@Arg('createVPReq') createVPReq: CreateVPByVCDocStringReq): Promise<VPDoc> {
        // Map VC document strings to VC documents
        const vcDocs = createVPReq.vcDocString
            .map(vcDocStr => this.vcService.resolveDocStringToDoc(vcDocStr));


        return await this.vpService.composeVPDoc(vcDocs, createVPReq.holder, createVPReq.kid, createVPReq.privateKey);
    }

    @Query(() => Boolean, {
        description: 'Verify VP document string offline (without checking issuance DB).',
    })
    async verifyVPDocStringOffline(@Arg('verifyVPReq') verifyVPReq: VerifyVPDocStringReq): Promise<boolean> {
        const vpDoc = this.vpService.resolveDocStringToDoc(verifyVPReq.vpDocString);

        return await this.vpService.verifyVPDoc(vpDoc, verifyVPReq.publicKey);
    }

}
