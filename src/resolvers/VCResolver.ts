import {Service} from "typedi";
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {VCService} from "../services/VCService";
import {VC} from "../models/entities/VC";
import {Assert} from "../common/assertion/Assert";
import {CreateVCReq, VCDoc, VerifyVCDocStrOffReq, VerifyVCDocStrOnReq} from "../models/dtos/VC.dto";
import {getReq} from "../util/HttpRequestUtil";
import {PublicKey} from "../models/models/PublicKey";
import {HttpErrorCode} from "../common/error-handling/ErroCode";

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
    async createVC(@Arg('createVCReq', {description: "Verifiable credential object"}) createVCReq: CreateVCReq):
        Promise<VCDoc> {
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
     * Verify VC Document String Online Request
     *
     * @param verifyVCReq
     */
    @Query(() => Boolean, {
        description: 'Verify VC document string online.',
    })
    async verifyVCDocStringOnline(@Arg('verifyVCReq') verifyVCReq: VerifyVCDocStrOnReq): Promise<boolean> {
        const vcDoc = this.vcService.resolveDocStringToDoc(verifyVCReq.vcDocString);

        const vm = vcDoc.proof?.verificationMethod;
        Assert.notNull(vm, HttpErrorCode.BAD_REQUEST, "Verification method should not be empty.");

        const publicKey = await getReq<PublicKey>(vm as string);

        return await this.vcService.verifyVCDoc(vcDoc, publicKey.jwk);
    }

    /**
     * Verify VC Document String Offline Request
     * without checking VDR and persistence.
     *
     * @param verifyVCReq
     */
    @Query(() => Boolean, {
        description: 'Verify VC document string offline (without checking VDR and persistence).',
    })
    async verifyVCDocStringOffline(@Arg('verifyVCReq') verifyVCReq: VerifyVCDocStrOffReq): Promise<boolean> {
        const vcDoc = this.vcService.resolveDocStringToDoc(verifyVCReq.vcDocString);

        return await this.vcService.verifyVCDoc(vcDoc, verifyVCReq.publicKey);
    }

    @Query(() => VCDoc, {
        description: 'Get VC ID document by id',
    })
    async resolveVCToDoc(@Arg('id', {description: "Verifiable credential identifier"}) id: number): Promise<VCDoc> {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, HttpErrorCode.NOT_FOUND, `VC (${id}) does not exist.`);
        return this.vcService.resolveVCToDoc(<VC>vc);
    }

    @Query(() => String, {
        description: 'Resolve VC ID to VC document string by id',
    })
    async resolveVCToDocString(@Arg('id', {description: "Verifiable credential identifier"}) id: number): Promise<string> {
        const vc = await this.vcService.retrieve(id);
        Assert.notNull(vc, HttpErrorCode.NOT_FOUND, `VC (${id}) does not exist.`);
        return JSON.stringify(this.vcService.resolveVCToDoc(<VC>vc));
    }

}
