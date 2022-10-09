/**
 * HTTP Request Utils
 *
 * @author Yepeng Ding
 */
import axios, {AxiosError} from "axios";
import {ErrResponse} from "../common/response/Response";

/**
 * Get request
 *
 * @param url URL
 */
export async function getReq<Type>(url: string): Promise<Type> {
    return await axios.get(url).then((res) => {
        return res.data as Type;
    }).catch((error: AxiosError) => {
        const res = error.response;
        if (res) {
            throw Error((res.data as ErrResponse).message);
        } else {
            throw Error(`Cannot connect ${url}.`);
        }
    });
}
