import {Service} from 'typedi';
import {UserRepository} from "../repositories/UserRepository";
import {User} from "../models/entities/User";

/**
 * User Service
 *
 * @author Yepeng Ding
 */
@Service()
export class UserService {

    public async findAll(): Promise<User[]> {
        return await UserRepository.find();
    }

    public async retrieve(id: number): Promise<User | null> {
        return await UserRepository.findOneBy({id});
    }

    public async retrieveByUsername(username: string): Promise<User | null> {
        return await UserRepository.findOneBy({username});
    }

    public async create(user: User): Promise<User> {
        return await UserRepository.save(user);
    }

    public async exists(username: string): Promise<boolean> {
        return await this.retrieveByUsername(username).then(user => user !== null)
    }

}
