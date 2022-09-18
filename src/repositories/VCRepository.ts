import AppDataSource from "../db";
import {VC} from '../models/entities/VC';

/**
 * Verifiable Credential Repository
 *
 * @author Yepeng Ding
 */
export const VCRepository = AppDataSource.getRepository(VC).extend({});
