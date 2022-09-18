import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm"
import {Field, ObjectType} from "type-graphql";

/**
 * Verifiable Credential Entity
 *
 * @author Yepeng Ding
 */
@ObjectType()
@Entity()
export class VC {

    @Field()
    @PrimaryGeneratedColumn()
    id: number

    /**
     * Issuer DID
     */
    @Field()
    @Column()
    issuer: string

    @Field()
    @Column()
    subject: string

    @Field()
    @Column()
    claim: string

    /**
     * Issuance Date
     */
    @Field()
    @CreateDateColumn()
    createdAt: Date

}
