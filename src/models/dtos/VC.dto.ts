import {IsNotEmpty, MaxLength} from "class-validator";
import {Field, InputType} from "type-graphql";

/**
 * Verifiable Credential DTOs
 *
 * @author Yepeng Ding
 */
@InputType()
export class CreateVC {

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    public issuer: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(2047)
    public credentialSubject: string;

}
