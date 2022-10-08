import {Field, ObjectType} from "type-graphql";

/**
 * Proof
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
