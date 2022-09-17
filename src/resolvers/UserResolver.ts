import {Service} from "typedi";
import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {UserService} from "../services/UserService";
import {User} from "../models/entities/User";
import {Assert} from "../common/assertion/Assert";
import {CreateUser} from "../models/dtos/User.dto";

/**
 * User Resolver
 *
 * @author Yepeng Ding
 */
@Service()
@Resolver()
export class UserResolver {

    constructor(
        private readonly userService: UserService
    ) {
    }

    @Query(() => [User], {
        description: 'Get user list',
    })
    async getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Query(() => User, {
        description: 'Get user by id',
    })
    async getUser(@Arg('id') id: number): Promise<User | null> {
        const user = await this.userService.retrieve(id);
        Assert.notNull(user, `User (${id}) does not exist.`);
        return user;
    }

    @Mutation(() => User, {
        description: 'Create user',
    })
    async createUser(@Arg('user') user: CreateUser): Promise<User> {
        const exist = await this.userService.exists(user.username);
        Assert.isFalse(exist, `User (${user.username}) exists.`);

        const _user = new User();
        _user.username = user.username;
        _user.firstname = user.firstname;
        _user.lastname = user.lastname;
        _user.age = user.age;
        return this.userService.create(_user);
    }

}
