/**
 * Context Util
 *
 * @author Yepeng Ding
 */
export class ContextUtil {

    /**
     * Get default context of VC
     *
     */
    public static defaultContextOfVC(): [string, string] {
        return [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
        ];
    }

    /**
     * Get default context of VP
     *
     */
    public static defaultContextOfVP(): [string, string] {
        return [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
        ];
    }

}
