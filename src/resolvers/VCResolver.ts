import {Service} from "typedi";
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {VCService} from "../services/VCService";
import {VC} from "../models/entities/VC";
import {Assert} from "../common/assertion/Assert";
import {CreateVC} from "../models/dtos/VC.dto";

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

    @Query(() => [VC], {
        description: 'Get vc list',
    })
    async getVCs(): Promise<VC[]> {
        return this.vcService.findAll();
    }

    @Query(() => VC, {
        description: 'Get VC by id',
    })
    async getUser(@Arg('id') id: number): Promise<VC | null> {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, `VC (${id}) does not exist.`);
        return vc;
    }

    @Mutation(() => VC, {
        description: 'Create vc',
    })
    async createVC(@Arg('vc') vc: CreateVC): Promise<VC> {
        const _vc = new VC();
        _vc.issuer = vc.issuer;
        _vc.credentialSubject = vc.credentialSubject;
        return this.vcService.create(_vc);
    }

}
