export const TestVC1String =
    `{
      "context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "http://localhost:9000/vc/1",
      "type": [
        "VerifiableCredential"
      ],
      "issuer": "did:issuer:0001",
      "issuanceDate": "2022-10-08T20:07:28.435Z",
      "credentialSubject": {
        "id": "did:holder:0001",
        "claim": "{\\"name\\":\\"Michael Ding\\",\\"institute\\":\\"The University of Tokyo\\",\\"program\\":\\"Ph.D.\\"}"
      },
      "proof": {
        "type": "Ed25519Signature2020",
        "created": "2022-10-08T22:07:28.000Z",
        "verificationMethod": "http://localhost:8000/did/did:issuer:0001#CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk",
        "proofPurpose": "assertionMethod",
        "proofValue": "eyJhbGciOiJFZERTQSJ9.YzkwNTIxMDc4NjQ2NjlmZmM2OTkwZDEzN2RhZmU4Zjg2MTcxNmU4MmY5NzUxZWFhNGM1Yzk0MGM2NWMzYTAxMQ.XwqXxNtHrDw1pzwbANxKu77_oW6ZGjAIZOcrfSZpxXGklRhiNhWK0A6mgKmZxFjWGMOytMeIohRsiu3QU86JCg"
      }
    }`;

export const TestVC2String =
    `
      "context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "http://localhost:9000/vc/2",
      "type": [
        "VerifiableCredential"
      ],
      "issuer": "did:issuer:0002",
      "issuanceDate": "2022-10-08T20:15:24.329Z",
      "credentialSubject": {
        "id": "did:holder:0001",
        "claim": "{\\"name\\":\\"Michael Ding\\",\\"institute\\":\\"ETH Zurich\\",\\"program\\":\\"Doctoral Exchange\\"}"
      },
      "proof": {
        "type": "Ed25519Signature2020",
        "created": "2022-10-08T22:15:24.000Z",
        "verificationMethod": "http://localhost:8000/did/did:issuer:0002#CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk",
        "proofPurpose": "assertionMethod",
        "proofValue": "eyJhbGciOiJFZERTQSJ9.MWFmMzc4ZTFjMmI0ZWMyN2Y5YmNmYWU1MWUwNDQ0Nzg3N2I0MjliOWMzN2U2MzE3NTRkY2IwOWI2YjQ5MmNlNg.3nAWvKiXd-07hkq9aWFqosOwb8P_3ntO08Xsn7I96Y4kXYb6_BFHWgcHd_XLerAKukzgqObleXuSKuitih4gDA"
      }
    }`;

export const TestBadVC1String =
    `{
      "context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "http://localhost:9000/vc/1",
      "type": [
        "VerifiableCredential"
      ],
      "issuer": "did:issuer:0001",
      "issuanceDate": "2022-10-08T20:07:28.435Z",
      "credentialSubject": {
        "id": "did:holder:0001",
        "claim": "{\\"name\\":\\"Michael\\",\\"institute\\":\\"The University of Tokyo\\",\\"program\\":\\"Ph.D.\\"}"
      },
      "proof": {
        "type": "Ed25519Signature2020",
        "created": "2022-10-08T22:07:28.000Z",
        "verificationMethod": "http://localhost:8000/did/did:issuer:0001#CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk",
        "proofPurpose": "assertionMethod",
        "proofValue": "eyJhbGciOiJFZERTQSJ9.YzkwNTIxMDc4NjQ2NjlmZmM2OTkwZDEzN2RhZmU4Zjg2MTcxNmU4MmY5NzUxZWFhNGM1Yzk0MGM2NWMzYTAxMQ.XwqXxNtHrDw1pzwbANxKu77_oW6ZGjAIZOcrfSZpxXGklRhiNhWK0A6mgKmZxFjWGMOytMeIohRsiu3QU86JCg"
      }
    }`;