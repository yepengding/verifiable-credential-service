import {Service} from "typedi";
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {VCService} from "../services/VCService";
import {CreateVPByVCDocStringReq, VerifyVPDocStrOffReq, VerifyVPDocStrOnReq, VPDoc} from "../models/dtos/VP.dto";
import {VPService} from "../services/VPService";
import {Assert} from "../common/assertion/Assert";
import {HttpErrorCode} from "../common/error-handling/ErroCode";
import {getReq} from "../util/HttpRequestUtil";
import {PublicKey} from "../models/dtos/res/PublicKey.dto";
import {didOfVMUrl} from "../util/URLUtil";

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
    async createVPByVCDocString(@Arg('createVPReq', {description: "Verifiable presentation object."}) createVPReq: CreateVPByVCDocStringReq)
        : Promise<VPDoc> {
        // Map VC document strings to VC documents
        const vcDocs = createVPReq.vcDocString
            .map(vcDocStr => this.vcService.resolveDocStringToDoc(vcDocStr));


        return await this.vpService.composeVPDoc(vcDocs, createVPReq.holder, createVPReq.kid, createVPReq.privateKey);
    }

    /**
     * Verify VP Document String Online
     *
     * @param verifyVPReq
     */
    @Query(() => Boolean, {
        description: 'Verify VP document string online.',
    })
    async verifyVPDocStringOnline(@Arg('verifyVPReq') verifyVPReq: VerifyVPDocStrOnReq): Promise<boolean> {
        const vpDoc = this.vpService.resolveDocStringToDoc(verifyVPReq.vpDocString);

        // Verify VP
        const vm = vpDoc.proof?.verificationMethod;
        Assert.notNull(vm,
            HttpErrorCode.BAD_REQUEST, "Verification method should not be empty.");
        Assert.isTrue(vpDoc.holder === didOfVMUrl(vm as string),
            HttpErrorCode.UNAUTHORIZED, "The verification method does not match the holder.");

        const vcDocs = vpDoc.verifiableCredential;
        Assert.isTrue(vcDocs.length > 0,
            HttpErrorCode.BAD_REQUEST, "Verifiable credentials should not be empty.");

        // Verify VC documents
        const verifyVCDocs = vcDocs.map(vcDoc => {
            const vm = vcDoc.proof?.verificationMethod;
            Assert.notNull(vm,
                HttpErrorCode.BAD_REQUEST, "Verification method should not be empty.");
            Assert.isTrue(vcDoc.issuer === didOfVMUrl(vm as string),
                HttpErrorCode.UNAUTHORIZED, "The verification method does not match the issuer.");
            return {vcDoc: vcDoc, publicKey: getReq<PublicKey>(vm as string)};
        });

        for (const vVc of verifyVCDocs) {
            const verified = await this.vcService.verifyVCDoc(vVc.vcDoc, (await vVc.publicKey).jwk);
            Assert.isTrue(verified, HttpErrorCode.UNAUTHORIZED, "Unauthorized verifiable credential is detected.");
        }

        return await this.vpService.verifyVPDoc(vpDoc, (await getReq<PublicKey>(vm as string)).jwk);
    }

    /**
     * Verify VP Document String Offline
     * without checking checking VDR and persistence
     *
     * @param verifyVPReq
     */
    @Query(() => Boolean, {
        description: 'Verify VP document string offline (without checking checking VDR and persistence).',
    })
    async verifyVPDocStringOffline(@Arg('verifyVPReq') verifyVPReq: VerifyVPDocStrOffReq): Promise<boolean> {
        const vpDoc = this.vpService.resolveDocStringToDoc(verifyVPReq.vpDocString);
        Assert.isTrue(vpDoc.verifiableCredential.length > 0, HttpErrorCode.BAD_REQUEST, "Verifiable credentials should not be empty.");

        // Verify VP
        const vm = vpDoc.proof?.verificationMethod;
        Assert.notNull(vm,
            HttpErrorCode.BAD_REQUEST, "Verification method should not be empty.");
        Assert.isTrue(vpDoc.holder === didOfVMUrl(vm as string),
            HttpErrorCode.UNAUTHORIZED, "The verification method does not match the holder.");

        return await this.vpService.verifyVPDoc(vpDoc, verifyVPReq.publicKey);
    }

}
