import {Service} from "typedi";
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {VCService} from "../services/VCService";
import {VC} from "../models/entities/VC";
import {Assert} from "../common/assertion/Assert";
import {CreateVCReq, VCDoc} from "../models/dtos/VC.dto";

/**
 * User Resolver
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

    @Query(() => VCDoc, {
        description: 'Get VC by id',
    })
    async getVC(@Arg('id') id: number): Promise<VCDoc> {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, `VC (${id}) does not exist.`);
        return this.vcService.resolveVCtoDoc(<VC>vc);
    }

    @Mutation(() => VC, {
        description: 'Create VC',
    })
    async createVC(@Arg('vc') vc: CreateVCReq): Promise<VC> {
        return this.vcService.create(vc as VC);
    }

}
