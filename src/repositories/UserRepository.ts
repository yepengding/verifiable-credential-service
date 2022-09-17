import AppDataSource from "../db";
import {User} from '../models/entities/User';

/**
 * User Repository
 *
 * @author Yepeng Ding
 */
export const UserRepository = AppDataSource.getRepository(User).extend({});
