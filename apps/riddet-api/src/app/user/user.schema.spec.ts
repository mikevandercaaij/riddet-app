import { Test } from '@nestjs/testing';

import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, Model } from 'mongoose';

import { User, UserDocument, UserSchema } from "./user.schema";

describe('User Schema (UNIT TESTS)', () => {
  let mongod: MongoMemoryServer;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return {uri};
          },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
      ],
    }).compile();

    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    await userModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('has a required username', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.username).toBeInstanceOf(Error);
  });

  it('has a required email', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.email).toBeInstanceOf(Error);
  });

  it('has a required firstname', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.firstname).toBeInstanceOf(Error);
  });

  it('has a required lastname', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.lastname).toBeInstanceOf(Error);
  });

  it('has a required date of birth', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.dateOfBirth).toBeInstanceOf(Error);
  });

  it('has a unique username', async () => {
    const original = new userModel({username: 'tester123', email: 'test1@test.com', firstname: "test", lastname: "tester", dateOfBirth: new Date().toISOString()});
    const duplicate = new userModel({username: 'tester123', email: 'test2@test.com', firstname: "test", lastname: "tester", dateOfBirth: new Date().toISOString()});

    await original.save();

    await expect(duplicate.save()).rejects.toThrow();
  });

  it('has a unique email', async () => {
    const original = new userModel({username: 'tester12345', email: 'test@test.com', firstname: "test", lastname: "tester", dateOfBirth: new Date()});
    const duplicate = new userModel({username: 'tester123', email: 'test@test.com', firstname: "test", lastname: "tester", dateOfBirth: new Date()});

    await original.save();

    await expect(duplicate.save()).rejects.toThrow();
  });

  it('has an invalid date of birth', async () => {
    const model = new userModel({username: 'tester123', email: 'test@test.com', firstname: "test", lastname: "tester", dateOfBirth: true});

    const err = model.validateSync();

    expect(err.errors.dateOfBirth).toBeInstanceOf(Error);
  });

  it('has an empty role list by default', () => {
    const model = new userModel();

    expect(model.roles).toStrictEqual([]);
  });

  it('has an empty created communities list by default', () => {
    const model = new userModel();

    expect(model.createdCommunities).toStrictEqual([]);
  });

  it('has an empty joined communities list by default', () => {
    const model = new userModel();

    expect(model.joinedCommunities).toStrictEqual([]);
  });

  it('has an empty following list by default', () => {
    const model = new userModel();

    expect(model.following).toStrictEqual([]);
  });

  it('has an empty followers list by default', () => {
    const model = new userModel();

    expect(model.followers).toStrictEqual([]);
  });

  it('is active by default', () => {
    const model = new userModel();

    expect(model.isActive).toBe(true);
  });

  it('does not accept an invalid email address', () => {
    const model = new userModel({email: 'unvalidemail'});

    const err = model.validateSync();

    expect(err.errors.email).toBeInstanceOf(Error);
  });
});