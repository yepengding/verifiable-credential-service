export const TestVP1String =
    `{
      "context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "urn:uuid:d79a33de-597d-41c3-b147-dbc03a5de534",
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
          "issuer": "did:issuer:0002",
          "issuanceDate": "2022-10-08T22:08:36.502Z",
          "credentialSubject": {
            "id": "did:holder:0001",
            "claim": "{\\"name\\":\\"Michael Ding\\",\\"institute\\":\\"ETH Zurich\\",\\"program\\":\\"Doctoral Exchange\\"}"
          },
          "proof": {
            "type": "Ed25519Signature2020",
            "created": "2022-10-09T00:08:37.000Z",
            "verificationMethod": "http://localhost:8000/key/did:issuer:0002/CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk",
            "proofPurpose": "assertionMethod",
            "proofValue": "eyJhbGciOiJFZERTQSJ9.YjI0MDU1ODcyNzcyMDRlOTBkZjMwZGI4MjZiYzY0ZjdiNzI4ZmQ1MjIwMTg0NjllYjQxOWQwZjFmZDAzMWVjNA.5f6_zb_pgfq4sQR70ZiPfUlFafCJC4CDWq9nqMHzI5zzr-EKQAgHp58WNmyFF2YVZD_TpkrjK4ad-mXka5gjAg"
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
          "issuer": "did:issuer:0001",
          "issuanceDate": "2022-10-08T22:09:09.386Z",
          "credentialSubject": {
            "id": "did:holder:0001",
            "claim": "{\\"name\\":\\"Michael Ding\\",\\"institute\\":\\"The University of Tokyo\\",\\"program\\":\\"Ph.D.\\"}"
          },
          "proof": {
            "type": "Ed25519Signature2020",
            "created": "2022-10-09T00:09:09.000Z",
            "verificationMethod": "http://localhost:8000/key/did:issuer:0001/CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk",
            "proofPurpose": "assertionMethod",
            "proofValue": "eyJhbGciOiJFZERTQSJ9.MDVhODgyMmVhZDcyOGYxMDM4NTdlYWU2MmRiNTUxMWNkMjVhZDhlNjNhNTE2OGMzOGM1ZDRkMzhkZTM1YTI5YQ.E_j8VbNJ9XW5_s6_fjxJBMFp2oQnCs6xbNZ0DVm33wB4WaftcQK2sNI2wr_Cdm0cIPEMQRTJ87aIr6Trl4ucCQ"
          }
        }
      ],
      "holder": "did:holder:0001",
      "proof": {
        "type": "Ed25519Signature2020",
        "created": "2022-10-09T00:18:12.383Z",
        "verificationMethod": "http://localhost:8000/key/did:holder:0001/CsXAQG0Ry0sQmiaOimJq7_B78__Dplm2bXd9GmvXvrk",
        "proofPurpose": "assertionMethod",
        "proofValue": "eyJhbGciOiJFZERTQSJ9.NWI2ODNhMTBhYmMxOTA0NDI5MWE5Yjg3MjBjMTQ2MTIxM2Y3MWMxMjg3ZWE5YWM2OTJmMTY2ZTU5NmYyNjE5Mw.tB2hWWb1NMqY018AmNAR7G5b7WZ9O9i0VXtCdQiFV6m3FUmzSSqA5U2ZKp_ULoGoDGOzFFXJOiGAx5QQuZbwCg"
      }
    }`;
