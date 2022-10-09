# Verifiable Credential Service

A lightweight service providing verifiable credential functionalities based
on [swift-express-graphql](https://github.com/yepengding/swift-express-graphql).

## Cryptographic Algorithm

| Functionality       | Algorithm | Curve   |
|---------------------|-----------|---------|
| VC/VP Hashing       | SHA256    |         |
| VC/VP Proof Signing | EdDSA     | Ed25519 |

Proof value = Sign(Hash(Doc \ Proof))

## Feature

- [x] Issue VCs/VPs.
- [x] VC persistence.
- [x] Verify VCs/VPs offline.
- [x] Verify VCs/VPs online (with VDR and VC persistence).
- [x] VC resolving by REST and GraphQL
- [x] Administration.

# Quickstart

## By Docker Compose

1. Duplicate `.env.example` as `.env` and configure environment variables;
2. Configure `Dockerfile` and `docker-compose.yml`;
3. Compose and run containers.

```shell
docker compose up -d
```

## By Docker

1. Duplicate `.env.example` as `.env` and configure environment variables;
2. Configure `Dockerfile`;
3. Build Docker image

```shell
docker build -t vcs .
```

3. Run in container

```shell
docker run -p <host_port>:<container_port> --name <container_name> -d vcs
```

## Manually

1. Install dependencies

```shell
yarn install
```

2. Duplicate `.env.example` as `.env` and configure environment variables;

3. Build project to `dist`;

```shell
npm run build
```

4. Run project.

```shell
npm run start
```

## Development

- Run dev server

```shell
yarn dev
```

# API

## GraphQL

domain/graphql

## REST

domain/api-docs

---

# References

- [Verifiable Credentials Data Model v1.1](https://www.w3.org/TR/vc-data-model/)
- [Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core/)
- [Javascript Object Signing and Encryption](https://www.researchgate.net/publication/362015906_Javascript_Object_Signing_and_Encryption_JOSE_Standards_Considerations_and_Applications)
- [swift-express-graphql](https://github.com/yepengding/swift-express-graphql)
- [jose](https://github.com/panva/jose)
