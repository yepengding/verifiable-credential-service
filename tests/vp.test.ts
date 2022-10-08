import http from "http";
import request from "supertest";
import process from "process";
import {App} from "../src/app";
import {AssertionKey} from "./data/KeyData.test";
import {TestVC1String, TestVC2String} from "./data/VCData.test";
import {TestVP1String} from "./data/VPData.test";

describe('VP GraphQL tests', () => {

    let server: http.Server;
    const serverAddress = "http://localhost:9000";

    before(() => {
        const app = new App();
        server = app.run();
    })

    after(() => {
        server.close();
        process.exit(0);
    })

    it('should compose VP offline.', async () => {
        const holder = "did:holder:0001";
        const kid = AssertionKey.kid;
        const privateKey = AssertionKey.private;
        const vcDocString = [TestVC1String, TestVC2String];

        const mutationData = {
            query:
                `mutation Mutation($createVpReq: CreateVPByVCDocStringReq!) {
                  createVPByVCDocString(createVPReq: $createVpReq) {
                    context
                    id
                    type
                    verifiableCredential {
                      context
                      id
                      type
                      issuer
                      issuanceDate
                      credentialSubject {
                        id
                        claim
                      }
                      proof {
                        type
                        created
                        verificationMethod
                        proofPurpose
                        proofValue
                      }
                    }
                  }
                }`,
            variables:
                `{
                  "createVpReq": {
                    "holder": "${holder}",
                    "kid": "${kid}",
                    "privateKey": ${JSON.stringify(privateKey)},
                    "vcDocString": ${JSON.stringify(vcDocString)}
                  }
                }`
        };

        console.log(mutationData.variables)

        await request(`${serverAddress}/graphql`)
            .post("/")
            .send(mutationData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => console.log(res.body));
    });

    it('should verify VP offline', async () => {
        const vp = TestVP1String;
        const publicKey = AssertionKey.public;

        const queryData = {
            query: `
            query Query($verifyVpReq: VerifyVPDocStringReq!) {
              verifyVPDocStringOffline(verifyVPReq: $verifyVpReq)
            }`,
            variables: `{
                          "verifyVpReq": {
                            "publicKey": ${JSON.stringify(publicKey)},
                            "vpDocString": ${JSON.stringify(vp)}
                          }
                        }`,
        }

        await request(`${serverAddress}/graphql`)
            .post("/")
            .send(queryData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => console.log(res.body));
    });
})
