/**
 * Verifiable Credential DTOs.
 *
 * @author Yepeng Ding
 */

import {IsNotEmpty, MaxLength} from "class-validator";
import {Field, InputType, ObjectType} from "type-graphql";

/**
 * Create VC Request
 */
@InputType({description: "Create VC request."})
export class CreateVCReq {

    @Field({description: "Issuer DID."})
    @IsNotEmpty()
    @MaxLength(255)
    public issuer: string;

    @Field({description: "Subject DID."})
    @IsNotEmpty()
    @MaxLength(255)
    public subject: string;

    @Field({description: "Claim associated with the subject."})
    @IsNotEmpty()
    @MaxLength(2047)
    public claim: string;

    @Field({description: "Signing key ID."})
    @IsNotEmpty()
    @MaxLength(255)
    public kid: string;

    @Field({description: "Private signing key (JWK)."})
    @IsNotEmpty()
    @MaxLength(255)
    public privateKey: string;

}

/**
 * Verify VC Request
 */
@InputType({description: "Verify VC request."})
export class VerifyVCReq {

    @Field({description: "Public signing key (JWK)."})
    @IsNotEmpty()
    @MaxLength(255)
    public publicKey: string;

    @Field({description: "Verifiable credential (document)."})
    @IsNotEmpty()
    @MaxLength(16383)
    public vc: string;

}

/**
 * VC Credential Subject
 */
@ObjectType({description: "Credential subject."})
export class CredentialSubject {

    @Field({description: "Subject DID."})
    id: string

    @Field({description: "Claim associated with the subject."})
    claim: string
}

/**
 * VC Proof
 */
@ObjectType({description: "VC proof."})
export class Proof {

    @Field({description: "Proof type"})
    type: string

    @Field({description: "Created time."})
    created?: string

    @Field({description: "Verification method."})
    verificationMethod: string

    @Field({description: "Proof purpose."})
    proofPurpose: string

    @Field({description: "Proof value."})
    proofValue?: string
}


@ObjectType({description: "VC document."})
export class VCDoc {

    @Field(() => [String], {description: "VC contexts."})
    context: string[]

    @Field({description: "VC identifier."})
    id: string

    @Field(() => [String], {description: "VC type."})
    type: string[]

    @Field({description: "Issuer DID."})
    issuer: string

    @Field({description: "Issuance date."})
    issuanceDate: string

    @Field(() => CredentialSubject, {description: "Credential subject."})
    credentialSubject: CredentialSubject

    @Field(() => Proof, {description: "VC proof."})
    proof?: Proof

}
