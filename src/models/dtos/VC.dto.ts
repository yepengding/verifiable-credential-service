/**
 * Verifiable Credential DTOs.
 *
 * @author Yepeng Ding
 */

import {IsNotEmpty, MaxLength} from "class-validator";
import {Field, InputType, ObjectType} from "type-graphql";
import {Proof} from "./Common.dto";

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

    @Field({description: "Assertion key ID."})
    @IsNotEmpty()
    @MaxLength(255)
    public kid: string;

    @Field({description: "Private assertion key (JWK string)."})
    @IsNotEmpty()
    @MaxLength(255)
    public privateKey: string;

}

/**
 * Verify VC Document String Request
 */
@InputType({description: "Verify VC request."})
export class VerifyVCDocStringReq {

    @Field({description: "Public assertion key (JWK string)."})
    @IsNotEmpty()
    @MaxLength(255)
    public publicKey: string;

    @Field({description: "Verifiable credential document string."})
    @IsNotEmpty()
    @MaxLength(16383)
    public vcDocString: string;

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
