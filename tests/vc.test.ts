import http from "http";
import request from "supertest";
import process from "process";
import {App} from "../src/app";
import {AssertionKey} from "./data/KeyData.test";
import {TestVC1String} from "./data/VCData.test";

describe('VC GraphQL tests', () => {

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

    it('should create VC offline', async () => {
        const issuer = "did:issuer:0002";
        const subject = "did:holder:0001";
        const claim = JSON.stringify({
            name: "Michael Ding",
            institute: "ETH Zurich",
            program: "Doctoral Exchange"
        });
        const kid = AssertionKey.kid;
        const privateKey = AssertionKey.private;

        const mutationData = {
            query:
                `mutation CreateVC($createVcReq: CreateVCReq!) {
                    createVC(createVCReq: $createVcReq) {
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
                        context
                    }
                }`,
            variables: `{
                          "createVcReq": {
                            "issuer": "${issuer}",
                            "subject": "${subject}",
                            "claim": ${JSON.stringify(claim)},
                            "kid": "${kid}",
                            "privateKey": ${JSON.stringify(privateKey)}
                          }
                        }`,
        };

        await request(`${serverAddress}/graphql`)
            .post("/")
            .send(mutationData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => console.log(res.body));
    });

    it('should verify VC', async () => {
        const vc = TestVC1String;
        const publicKey = AssertionKey.public;

        const queryData = {
            query: `
            query Query($verifyVcReq: VerifyVCDocStringReq!) {
              verifyVCDocStringOffline(verifyVCReq: $verifyVcReq)
            }`,
            variables: `{
                          "verifyVcReq": {
                            "publicKey": ${JSON.stringify(publicKey)},
                            "vcDocString": ${JSON.stringify(vc)}
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

});
