import {Service} from "typedi";
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {VCService} from "../services/VCService";
import {VC} from "../models/entities/VC";
import {Assert} from "../common/assertion/Assert";
import {CreateVCReq, VCDoc, VerifyVCReq} from "../models/dtos/VC.dto";
import * as jose from 'jose';
import {JWK} from 'jose';
import _ from "lodash";

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

    @Query(() => VCDoc, {
        description: 'Get VC by id',
    })
    async getVC(@Arg('id') id: number): Promise<VCDoc> {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, `VC (${id}) does not exist.`);
        return this.vcService.resolveVCtoDoc(<VC>vc);
    }

    @Query(() => String, {
        description: 'Resolve VC to JSON string by id',
    })
    async resolveVC(@Arg('id') id: number): Promise<string> {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, `VC (${id}) does not exist.`);
        return JSON.stringify(this.vcService.resolveVCtoDoc(<VC>vc));
    }

    /**
     * Create Verifiable Credential
     *
     * @param vcReq
     */
    @Mutation(() => VCDoc, {
        description: 'Create VC.',
    })
    async createVC(@Arg('vc') vcReq: CreateVCReq): Promise<VCDoc> {
        let vc = new VC();
        vc.issuer = vcReq.issuer;
        vc.subject = vcReq.subject;
        vc.claim = vcReq.claim;
        vc.kid = vcReq.kid;

        // Create VC in DB
        vc = await this.vcService.create(vc);

        // Resolve VC to VC document
        const vcDoc = this.vcService.resolveVCtoDoc(vc, false);

        // EdDSA (Ed25519) at default
        const algorithm = 'EdDSA';
        const privateKey = await jose.importJWK(JSON.parse(vcReq.privateKey) as JWK, algorithm);

        // Sign VC
        vc.proofValue = await new jose.CompactSign(
            new TextEncoder().encode(JSON.stringify(vcDoc)),
        )
            .setProtectedHeader({alg: algorithm})
            .sign(privateKey);

        vc.proofCreatedAt = new Date();

        // Update VC with proof
        vc = await this.vcService.update(vc);

        return this.vcService.resolveVCtoDoc(vc);
    }

    @Query(() => Boolean, {
        description: 'Verify VC.',
    })
    async verifyVC(@Arg('vc') vcReq: VerifyVCReq): Promise<boolean> {
        const vcDoc = JSON.parse(vcReq.vc) as VCDoc;

        // Get public singing key
        const algorithm = 'EdDSA';
        const publicKey = await jose.importJWK(JSON.parse(vcReq.publicKey) as JWK, algorithm);

        // Get proof value
        const proofValue = vcDoc.proof?.proofValue as string;

        // Delete proof
        delete vcDoc.proof;

        // Parse proof value
        const {payload} = await jose.compactVerify(proofValue, publicKey);

        // Get credential string
        const payloadStr = new TextDecoder().decode(payload);

        // Build credential object
        const credential = JSON.parse(payloadStr) as VCDoc;

        // Judge if credentials are equal
        return _.isEqual(credential, vcDoc);
    }

}
