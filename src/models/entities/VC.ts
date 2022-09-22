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

    /**
     * Credential Subject DID
     */
    @Field()
    @Column()
    subject: string

    /**
     * Credential Subject Claim
     */
    @Field()
    @Column()
    claim: string

    /**
     * Key ID of the public key for signature (Verification Method)
     */
    @Field()
    @Column()
    kid: string

    @Field()
    @Column("longtext", {nullable: true})
    proofValue?: string

    @Field()
    @Column({nullable: true})
    proofCreatedAt?: Date

    /**
     * Issuance Date
     */
    @Field()
    @CreateDateColumn()
    createdAt: Date

}
