import {getAppDataSource} from "../db";
import {VC} from '../models/entities/VC';

/**
 * Verifiable Credential Repository
 *
 * @author Yepeng Ding
 */
export const getVCRepository = async () => {
    const dataSource = await getAppDataSource();
    return dataSource.getRepository(VC).extend({});
}
