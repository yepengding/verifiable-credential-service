/**
 * Verifiable Presentation DTOs.
 *
 * @author Yepeng Ding
 */

import {IsArray, IsNotEmpty, MaxLength} from "class-validator";
import {Field, InputType, ObjectType} from "type-graphql";
import {Proof} from "./Common.dto";
import {VCDoc} from "./VC.dto";

/**
 * Create VP by VC document string request.
 */
@InputType({description: "Create VP by VC document string request."})
export class CreateVPByVCDocStringReq {

    @Field({description: "Holder DID."})
    @IsNotEmpty()
    @MaxLength(255)
    public holder: string;

    @Field({description: "Assertion key ID."})
    @IsNotEmpty()
    @MaxLength(255)
    public kid: string;

    @Field({description: "Private assertion key (JWK)."})
    @IsNotEmpty()
    @MaxLength(255)
    public privateKey: string;

    @Field(() => [String], {description: "Verifiable credentials."})
    @IsArray()
    public vcDocString: string[];

}

/**
 * Verify VP Document String Request
 */
@InputType({description: "Verify VP document string request."})
export class VerifyVPDocStringReq {

    @Field({description: "Public assertion key (JWK)."})
    @IsNotEmpty()
    @MaxLength(255)
    public publicKey: string;

    @Field({description: "Verifiable presentation document string."})
    @IsNotEmpty()
    @MaxLength(16383)
    public vpDocString: string;

}


@ObjectType({description: "VP document."})
export class VPDoc {

    @Field(() => [String], {description: "VP contexts."})
    context: string[]

    @Field({description: "VP identifier."})
    id: string

    @Field(() => [String], {description: "VP type."})
    type: string[]

    @Field(() => [VCDoc], {description: "Verifiable credentials."})
    verifiableCredential: VCDoc[]

    @Field({description: "Holder DID."})
    public holder: string;

    @Field(() => Proof, {description: "VP proof."})
    proof?: Proof

}