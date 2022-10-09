export const TestVP1String =
    `{
      "context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "urn:uuid:aa8ce3a6-cce1-4aff-b257-c7e86079f0bf",
      "type": [
        "VerifiablePresentation"
      ],
      "verifiableCredential": [
        {
          "context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
          ],
          "id": "http://localhost:9000/vc/1",
          "type": [
            "VerifiableCredential"
          ],
          "issuer": "did:issuer:0001",
          "issuanceDate": "2022-10-09T10:15:55.382Z",
          "credentialSubject": {
            "id": "did:holder:0001",
            "claim": "{\\"name\\":\\"Michael Ding\\",\\"institute\\":\\"The University of Tokyo\\",\\"program\\":\\"Ph.D.\\"}"
          },
          "proof": {
            "type": "Ed25519Signature2020",
            "created": "2022-10-09T12:15:55.000Z",
            "verificationMethod": "http://localhost:8000/key/did:issuer:0001/CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk",
            "proofPurpose": "assertionMethod",
            "proofValue": "eyJhbGciOiJFZERTQSJ9.MWI4Mjk4MDU0OTZkYzRkMGU0ODY1Y2RiNDdjZDM0MjljNzUxM2JkODY2NmU5OWUzMzBiZWE3NmRmZWIxMmNkNQ.pUJSf-fnVjiggDhxMyzZMaC4Sn23XPF9B96BLCKsNv13tB44bDs77TR7FaWIpHI3H6xRoOMkFFvk3KVq_b8GDA"
          }
        },
        {
          "context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
          ],
          "id": "http://localhost:9000/vc/2",
          "type": [
            "VerifiableCredential"
          ],
          "issuer": "did:issuer:0002",
          "issuanceDate": "2022-10-09T10:16:42.054Z",
          "credentialSubject": {
            "id": "did:holder:0001",
            "claim": "{\\"name\\":\\"Michael Ding\\",\\"institute\\":\\"ETH Zurich\\",\\"program\\":\\"Doctoral Exchange\\"}"
          },
          "proof": {
            "type": "Ed25519Signature2020",
            "created": "2022-10-09T12:16:42.000Z",
            "verificationMethod": "http://localhost:8000/key/did:issuer:0002/wF61KvPovXAGJO2cPXGBYVSQ_rF7MWau5bsiRuzKluA",
            "proofPurpose": "assertionMethod",
            "proofValue": "eyJhbGciOiJFZERTQSJ9.M2JiOTYyZDZiM2QwNjM5MzU5Y2UyYmRhNjAxNDI2NzAxMzE2YjNlOWMzYzNmMDM2NDQ3Y2VmZDhjNjUzYTYyYw.ojyfc6c2WBIJ1Kw_YcwIv1JNgsfG_DoIw5zRmv-ZwXzf3BG9ybQ4caQRbcDb3eMi4pMQa0xlHJdL020Pu10DBQ"
          }
        }
      ],
      "holder": "did:holder:0001",
      "proof": {
        "type": "Ed25519Signature2020",
        "created": "2022-10-09T12:20:06.714Z",
        "verificationMethod": "http://localhost:8000/key/did:holder:0001/9QV587E9gAqzS3WCCTYR9Io0bCMDisv7pf7hsIJDd08",
        "proofPurpose": "assertionMethod",
        "proofValue": "eyJhbGciOiJFZERTQSJ9.OWZhMWQ0YmM0NDZjZDUyNDRmOWY5YTI5NzlmYjg4ZWUyODJhNTY5NTc4YjBhMWJmODFhMmNmNmI2OGY4ZGRlMg.c5cvF3fFeKPEwtCMNSY2e2LXwVgLyFXnUNkpsRH3ywSTyiH7kdfbBh7NgzmFfrhQ7wKW--O164-mzz8ScVyQBg"
      }
    }`;
