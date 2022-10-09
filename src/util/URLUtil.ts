/**
 * URL Utils
 *
 * @author Yepeng Ding
 */
import {env} from "../common/env";

/**
 * Get URL of a verification method
 *
 * @param did decentralized identifier
 * @param kid key identifier
 */
export const urlOfVerificationMethod = (did: string, kid: string): string => {
    return `${env.vdr.endpoint}/key/${did}/${kid}`;
}


/**
 * Get URL of a verifiable credential
 *
 * @param id verifiable credential identifier
 * @return url
 */
export const urlOfVC = (id: number): string => {
    return `${env.app.endpoint}/vc/${id}`;
}
