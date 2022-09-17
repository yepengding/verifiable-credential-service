import {IsNotEmpty, IsPositive, Max, MaxLength} from "class-validator";
import {Field, InputType} from "type-graphql";

/**
 * User DTOs
 *
 * @author Yepeng Ding
 */
@InputType()
export class CreateUser {

    @Field()
    @IsNotEmpty()
    @MaxLength(55)
    public username: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(55)
    public firstname: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(55)
    public lastname: string;

    @Field()
    @IsPositive()
    @Max(150)
    public age: number;
}
