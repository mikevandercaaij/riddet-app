import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { Public } from './../auth/auth.module';
import { UserController } from './user.controller';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

describe('User controller (INTEGRATION TESTS)', () => {
    let app: TestingModule;
    let userController: UserController;
    let userService: UserService;
    const fakeGuard: CanActivate = { canActivate: () => true };

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: {
                    getAll: jest.fn(),
                    getById: jest.fn(),
                    create: jest.fn(),
                    update: jest.fn(),
                },
            }],
        })
            .overrideGuard(Public).useValue(fakeGuard)
            .compile();

        userController = app.get<UserController>(UserController);
        userService = app.get<UserService>(UserService);
    });

    it('should call getAll on the service', async () => {
        const exampleUsers: User[] = [
            {
                _id: new Types.ObjectId(),
                username: 'tester', 
                email: 'test@test.com', 
                firstname: "test", 
                lastname: "tester", 
                dateOfBirth: new Date(),
                password: '',
                creationDate: new Date(),
                isActive: true,
                roles: [],
                userImageUrl: '',
                joinedCommunities: [],
                createdCommunities: [],
                followers: [],
                following: []
            },
            {
                _id: new Types.ObjectId(),
                username: 'tester2', 
                email: 'test2@test.com', 
                firstname: "test", 
                lastname: "tester", 
                dateOfBirth: new Date(),
                password: '',
                creationDate: new Date(),
                isActive: true,
                roles: [],
                userImageUrl: '',
                joinedCommunities: [],
                createdCommunities: [],
                followers: [],
                following: []
            }
        ]

        const getUsers = jest.spyOn(userService, 'getAll')
            .mockImplementation(async () => exampleUsers);

        const results = await userController.getAll();

        expect(getUsers).toBeCalledTimes(1);
        expect(results).toHaveLength(2);

        expect(results[0]).toHaveProperty('_id', exampleUsers[0]._id);
        expect(results[0]).toHaveProperty('username', exampleUsers[0].username);
        expect(results[0]).toHaveProperty('dateOfBirth', exampleUsers[0].dateOfBirth);
        expect(results[0]).toHaveProperty('email', exampleUsers[0].email);
        expect(results[0]).toHaveProperty('password', exampleUsers[0].password);
        expect(results[0]).toHaveProperty('creationDate', exampleUsers[0].creationDate);
        expect(results[0]).toHaveProperty('userImageUrl', exampleUsers[0].userImageUrl);
        expect(results[0]).toHaveProperty('isActive', exampleUsers[0].isActive);

        expect(results[1]).toHaveProperty('_id', exampleUsers[1]._id);
        expect(results[1]).toHaveProperty('username', exampleUsers[1].username);
        expect(results[1]).toHaveProperty('dateOfBirth', exampleUsers[1].dateOfBirth);
        expect(results[1]).toHaveProperty('email', exampleUsers[1].email);
        expect(results[1]).toHaveProperty('password', exampleUsers[1].password);
        expect(results[1]).toHaveProperty('creationDate', exampleUsers[1].creationDate);
        expect(results[1]).toHaveProperty('userImageUrl', exampleUsers[1].userImageUrl);
        expect(results[1]).toHaveProperty('isActive', exampleUsers[1].isActive);
    });

    it('should call getById on the service', async () => {
        const exampleUser: User = {
            _id: new Types.ObjectId(),
            username: 'tester', 
            email: 'test@test.com', 
            firstname: "test", 
            lastname: "tester", 
            dateOfBirth: new Date(),
            password: '',
            creationDate: new Date(),
            isActive: true,
            roles: [],
            userImageUrl: '',
            joinedCommunities: [],
            createdCommunities: [],
            followers: [],
            following: []
        };

        const getUserById = jest.spyOn(userService, 'getById')
            .mockImplementation(async () => exampleUser);

        const userId = '639a6d184362b5279e5094a0';

        const result = await userController.getById(userId);

        expect(getUserById).toBeCalledTimes(1);
        
        expect(result).toHaveProperty('_id', exampleUser._id);
        expect(result).toHaveProperty('username', exampleUser.username);
        expect(result).toHaveProperty('dateOfBirth', exampleUser.dateOfBirth);
        expect(result).toHaveProperty('email', exampleUser.email);
        expect(result).toHaveProperty('password', exampleUser.password);
        expect(result).toHaveProperty('creationDate', exampleUser.creationDate);
        expect(result).toHaveProperty('userImageUrl', exampleUser.userImageUrl);
        expect(result).toHaveProperty('isActive', exampleUser.isActive);
    });

    it('should call create on the service', async () => {
        const exampleUser: User = {
            _id: new Types.ObjectId(),
            username: 'tester', 
            email: 'test@test.com', 
            firstname: "test", 
            lastname: "tester", 
            dateOfBirth: new Date(),
            password: '',
            creationDate: new Date(),
            isActive: true,
            roles: [],
            userImageUrl: '',
            joinedCommunities: [],
            createdCommunities: [],
            followers: [],
            following: []
        }

        const exampleUserDto: CreateUserDto = { ...exampleUser };

        const create = jest.spyOn(userService, 'create')
            .mockImplementation(async () => exampleUser);

        const result: any = await userController.create(exampleUserDto);

        expect(create).toBeCalledTimes(1);

        expect(result).toHaveProperty('_id', exampleUser._id);
        expect(result).toHaveProperty('username', exampleUser.username);
        expect(result).toHaveProperty('dateOfBirth', exampleUser.dateOfBirth);
        expect(result).toHaveProperty('email', exampleUser.email);
        expect(result).toHaveProperty('password', exampleUser.password);
        expect(result).toHaveProperty('creationDate', exampleUser.creationDate);
        expect(result).toHaveProperty('userImageUrl', exampleUser.userImageUrl);
        expect(result).toHaveProperty('isActive', exampleUser.isActive);
    });

    it('should call update on the service', async () => {
        const exampleUser: User = {
            _id: new Types.ObjectId(),
            username: 'tester', 
            email: 'test@test.com', 
            firstname: "test", 
            lastname: "tester", 
            dateOfBirth: new Date(),
            password: '',
            creationDate: new Date(),
            isActive: true,
            roles: [],
            userImageUrl: '',
            joinedCommunities: [],
            createdCommunities: [],
            followers: [],
            following: []
        }

        const exampleUserDto: UpdateUserDto = { ...exampleUser };

        const update = jest.spyOn(userService, 'update')
            .mockImplementation(async () => exampleUser);

        const userId = '639a6d184362b5279e5094a0';

        const result: any = await userController.update(null, userId, exampleUserDto);

        expect(update).toBeCalledTimes(1);

        expect(result).toHaveProperty('_id', exampleUser._id);
        expect(result).toHaveProperty('username', exampleUser.username);
        expect(result).toHaveProperty('dateOfBirth', exampleUser.dateOfBirth);
        expect(result).toHaveProperty('email', exampleUser.email);
        expect(result).toHaveProperty('password', exampleUser.password);
        expect(result).toHaveProperty('creationDate', exampleUser.creationDate);
        expect(result).toHaveProperty('userImageUrl', exampleUser.userImageUrl);
        expect(result).toHaveProperty('isActive', exampleUser.isActive);
    });
});