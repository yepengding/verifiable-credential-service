import {IsNotEmpty, MaxLength} from "class-validator";
import {Field, InputType, ObjectType} from "type-graphql";

/**
 * Create VC Request
 *
 */
@InputType()
export class CreateVCReq {

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    public issuer: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    public subject: string;

    @Field()
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
    public key: string;

}

/**
 * VC Credential Subject
 */
@ObjectType()
export class CredentialSubject {

    @Field()
    id: string

    @Field()
    claim: string
}

/**
 * VC Proof
 */
@ObjectType()
export class Proof {

    @Field()
    type: string

    @Field()
    created?: string

    @Field()
    verificationMethod: string

    @Field()
    proofPurpose: string

    @Field()
    proofValue?: string
}


@ObjectType()
export class VCDoc {

    @Field(() => [String])
    context: string[]

    @Field()
    id: string

    @Field(() => [String])
    type: string[]

    @Field()
    issuer: string

    @Field()
    issuanceDate: string

    @Field(() => CredentialSubject)
    credentialSubject: CredentialSubject

    @Field(() => Proof)
    proof: Proof

}


