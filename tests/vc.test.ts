import http from "http";
import request from "supertest";
import process from "process";
import {App} from "../src/app";

describe('VC GraphQL tests', () => {

    let server: http.Server;
    const serverAddress = "http://localhost:8001";

    before(() => {
        const app = new App();
        server = app.run();
    })

    after(() => {
        server.close();
        process.exit(0);
    })

    it('should create VC', async () => {
        const issuer = "did:test:0001";
        const subject = "did:test:0002";
        const claim = JSON.stringify({
            name: "Michael",
            institute: "The University of Tokyo",
            year: 2
        });

        // Signing key identifier
        const kid = "CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk";

        // Private signing key (JWK)
        const privateKey = `{"crv":"Ed25519","d":"vO8B7VqTVHT1-Dhi5OEjRjbsWhOqt0W3NaLjJL-ROig","x":"aTxdlFfR4ORy8V9JFiQBDwOQay1p378x0oPJXM9I7Ao","kty":"OKP"}`;

        const mutationData = {
            query:
                `mutation Mutation($vc: CreateVCReq!) {
                  createVC(vc: $vc) {
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
                          "vc": {
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
        const vc = `{
                        "id": "http://localhost:8001/vc/1",
                        "type": [
                            "VerifiableCredential"
                        ],
                        "issuer": "did:test:0001",
                        "issuanceDate": "2022-10-06T20:35:58.782Z",
                        "credentialSubject": {
                            "id": "did:test:0002",
                            "claim": "{\\"name\\":\\"Michael\\",\\"institute\\":\\"The University of Tokyo\\",\\"year\\":2}"
                        },
                        "proof": {
                            "type": "Ed25519Signature2020",
                            "created": "2022-10-06T22:35:58.806Z",
                            "verificationMethod": "http://localhost:8000/did/did:test:0001#CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk",
                            "proofPurpose": "assertionMethod",
                            "proofValue": "eyJhbGciOiJFZERTQSJ9.eyJjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvZXhhbXBsZXMvdjEiXSwiaWQiOiJodHRwOi8vbG9jYWxob3N0OjgwMDEvdmMvMSIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiaXNzdWVyIjoiZGlkOnRlc3Q6MDAwMSIsImlzc3VhbmNlRGF0ZSI6IjIwMjItMTAtMDZUMjA6MzU6NTguNzgyWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOnRlc3Q6MDAwMiIsImNsYWltIjoie1wibmFtZVwiOlwiTWljaGFlbFwiLFwiaW5zdGl0dXRlXCI6XCJUaGUgVW5pdmVyc2l0eSBvZiBUb2t5b1wiLFwieWVhclwiOjJ9In19.H685FmVAr3SiQTUTKrbvSWvJ72zgio4uuierFB9lp0v9T-xRoeEfVTiGjd6yTxcEXUqmyIiCK5ag3wr8q2HpCQ"
                        },
                        "context": [
                            "https://www.w3.org/2018/credentials/v1",
                            "https://www.w3.org/2018/credentials/examples/v1"
                        ]
                    }`;

        const publicSigningKey = `{"crv":"Ed25519","x":"aTxdlFfR4ORy8V9JFiQBDwOQay1p378x0oPJXM9I7Ao","kty":"OKP"}`;

        const queryData = {
            query: `
            query Query($vc: VerifyVCReq!) {
              verifyVC(vc: $vc)
            }`,
            variables: `{
                          "vc": {
                            "publicKey": ${JSON.stringify(publicSigningKey)},
                            "vc": ${JSON.stringify(vc)}
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
