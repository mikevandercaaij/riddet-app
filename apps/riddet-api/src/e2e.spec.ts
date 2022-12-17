import request = require('supertest');
import { INestApplication, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from "mongodb-memory-server";
import { disconnect } from 'mongoose';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';
import { RolesGuard } from './app/auth/roles.guard';
import { CategoryModule } from './app/category/category.module';
import { CommunityModule } from './app/community/community.module';
import { MessageModule } from './app/message/message.module';
import { ThreadModule } from './app/thread/thread.module';
import { UserModule } from './app/user/user.module';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
      MongooseModule.forRootAsync({
        useFactory: async () => {
          mongod = await MongoMemoryServer.create();
          uri = mongod.getUri();
          return {uri};
        },
      }),
      CommunityModule,
      ThreadModule,
      UserModule,
      AuthModule,
      CategoryModule,
      MessageModule,
    ],
    controllers: [AppController],
    providers: [
    {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    },
    {
        provide: APP_GUARD,
        useClass: RolesGuard,
    },
    AppService
    ],
  })
  export class TestAppModule {}
  
  describe('API (END-TO-END TESTS)', () => {
    let app: INestApplication;
    let server;
    let module: TestingModule; 
    let mongoc: MongoClient;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TestAppModule],
          })
          .compile();
    
        app = module.createNestApplication();
        await app.init();
    
        mongoc = new MongoClient(uri);
        await mongoc.connect();
    
        server = app.getHttpServer();
      });

      beforeEach(async () => {
        await mongoc.db('test').collection('communities').deleteMany({});
        await mongoc.db('test').collection('users').deleteMany({});
        await mongoc.db('test').collection('categories').deleteMany({});
      });
    
      afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
      });

      it('User registers and logs in afterwards', async () => {

        const registerCredentials = {
            username: "mvdc2000",
            firstname: "Mike",
            lastname: "van der Caaij",
            email: "mvdc2000@hotmail.nl",
            dateOfBirth: "2000-07-18",
            password: "Geheim123",
            userImageUrl: "https://findicons.com/files/icons/573/must_have/256/user.png"
        }

        const register = await request(server)
        .post('/auth/register')
        .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('username')
        expect(register.body).toHaveProperty('firstname')
        expect(register.body).toHaveProperty('lastname')
        expect(register.body).toHaveProperty('email')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('userImageUrl')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('createdCommunities')

        const loginCredentials = {
          username: "mvdc2000@hotmail.nl",
          password: "Geheim123",
      }
      
        const login = await request(server)
        .post('/auth/login')
        .send(loginCredentials);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('username')
        expect(login.body).toHaveProperty('firstname')
        expect(login.body).toHaveProperty('lastname')
        expect(login.body).toHaveProperty('email')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('userImageUrl')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('createdCommunities')
      });

      it('User registers, logs in and creates a community afterwards', async () => {
        //REGISTER
        const registerCredentials = {
            username: "mvdc2000",
            firstname: "Mike",
            lastname: "van der Caaij",
            email: "mvdc2000@hotmail.nl",
            dateOfBirth: "2000-07-18",
            password: "Geheim123",
            userImageUrl: "https://findicons.com/files/icons/573/must_have/256/user.png"
        }

        const register = await request(server)
        .post('/auth/register')
        .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('username')
        expect(register.body).toHaveProperty('firstname')
        expect(register.body).toHaveProperty('lastname')
        expect(register.body).toHaveProperty('email')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('userImageUrl')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('createdCommunities')

        //LOGIN
        const loginCredentials = {
          username: "mvdc2000@hotmail.nl",
          password: "Geheim123",
        }
      
        const login = await request(server)
        .post('/auth/login')
        .send(loginCredentials);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('username')
        expect(login.body).toHaveProperty('firstname')
        expect(login.body).toHaveProperty('lastname')
        expect(login.body).toHaveProperty('email')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('userImageUrl')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('createdCommunities')

        //CREATE CATEGORY
        const categoryBody = {
          name: "Sport"
        }

        const category = await request(server)
        .post('/categories')
        .send(categoryBody);

        expect(category.body).toHaveProperty('_id')
        expect(category.body).toHaveProperty('name')

        //CREATE COMMUNITY
        const categoryId = category._body._id
        const token = login._body.access_token

        const communityBody = {
          "name": "Nederland",
          "description": "Welkom in de enige Nederlandse community!",
          "imageUrl": "https://tinypng.com/images/social/website.jpg",
          "categories": [categoryId.toString()],
          "isPublic": true
      }
      
        const community = await request(server)
        .post('/communities')
        .set('Authorization', 'bearer ' + token)
        .send(communityBody);

        expect(community.body).toHaveProperty('_id')
        expect(community.body).toHaveProperty('name')
        expect(community.body).toHaveProperty('description')
        expect(community.body).toHaveProperty('creationDate')
        expect(community.body).toHaveProperty('imageUrl')
        expect(community.body).toHaveProperty('isPublic')
        expect(community.body).toHaveProperty('categories')
        expect(community.body).toHaveProperty('participants')
        expect(community.body).toHaveProperty('threads')
        expect(community.body).toHaveProperty('createdBy')
      });

      it('User registers, logs in, creates a community and creates a thread afterwards', async () => {
        //REGISTER
        const registerCredentials = {
            username: "mvdc2000",
            firstname: "Mike",
            lastname: "van der Caaij",
            email: "mvdc2000@hotmail.nl",
            dateOfBirth: "2000-07-18",
            password: "Geheim123",
            userImageUrl: "https://findicons.com/files/icons/573/must_have/256/user.png"
        }

        const register = await request(server)
        .post('/auth/register')
        .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('username')
        expect(register.body).toHaveProperty('firstname')
        expect(register.body).toHaveProperty('lastname')
        expect(register.body).toHaveProperty('email')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('userImageUrl')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('createdCommunities')

        //LOGIN
        const loginCredentials = {
          username: "mvdc2000@hotmail.nl",
          password: "Geheim123",
        }
      
        const login = await request(server)
        .post('/auth/login')
        .send(loginCredentials);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('username')
        expect(login.body).toHaveProperty('firstname')
        expect(login.body).toHaveProperty('lastname')
        expect(login.body).toHaveProperty('email')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('userImageUrl')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('createdCommunities')

        //CREATE CATEGORY
        const categoryBody = {
          name: "Sport"
        }

        const category = await request(server)
        .post('/categories')
        .send(categoryBody);

        expect(category.body).toHaveProperty('_id')
        expect(category.body).toHaveProperty('name')


        //CREATE COMMUNITY
        const categoryId = category._body._id
        const token = login._body.access_token

        const communityBody = {
          "name": "Nederland",
          "description": "Welkom in de enige Nederlandse community!",
          "imageUrl": "https://tinypng.com/images/social/website.jpg",
          "categories": [categoryId.toString()],
          "isPublic": true
        }
      
        const community = await request(server)
        .post('/communities')
        .set('Authorization', 'bearer ' + token)
        .send(communityBody);

        expect(community.body).toHaveProperty('_id')
        expect(community.body).toHaveProperty('name')
        expect(community.body).toHaveProperty('description')
        expect(community.body).toHaveProperty('creationDate')
        expect(community.body).toHaveProperty('imageUrl')
        expect(community.body).toHaveProperty('isPublic')
        expect(community.body).toHaveProperty('categories')
        expect(community.body).toHaveProperty('participants')
        expect(community.body).toHaveProperty('threads')
        expect(community.body).toHaveProperty('createdBy')

        const communityId = community._body._id

        //CREATE THREAD
        const threadBody = {
          title: "My first thread!",
          content: "This is my first attempt of creating a thread!",
          imageUrl: "https://avatars.githubusercontent.com/u/72087008?s=400&u=cd2a2c12f275c0a3e785c6308e27644ce3fb72d7&v=4",
          externLink: "https://github.com/mikevandercaaij"
        }       

        const thread = await request(server)
        .post(`/communities/${communityId.toString()}/threads`)
        .set('Authorization', 'bearer ' + token)
        .send(threadBody);

        expect(thread.body).toHaveProperty('_id')
        expect(thread.body).toHaveProperty('name')
        expect(thread.body).toHaveProperty('description')
        expect(thread.body).toHaveProperty('creationDate')
        expect(thread.body).toHaveProperty('imageUrl')
        expect(thread.body).toHaveProperty('isPublic')
        expect(thread.body).toHaveProperty('categories')
        expect(thread.body).toHaveProperty('participants')
        expect(thread.body).toHaveProperty('createdBy')
        expect(thread.body).toHaveProperty('threads')
        expect(thread.body.threads[0]).toHaveProperty('_id')
        expect(thread.body.threads[0]).toHaveProperty('title')
        expect(thread.body.threads[0]).toHaveProperty('content')
        expect(thread.body.threads[0]).toHaveProperty('imageUrl')
        expect(thread.body.threads[0]).toHaveProperty('externLink')
        expect(thread.body.threads[0]).toHaveProperty('views')
        expect(thread.body.threads[0]).toHaveProperty('upvotes')
        expect(thread.body.threads[0]).toHaveProperty('publicationDate')
        expect(thread.body.threads[0]).toHaveProperty('messages')
        expect(thread.body.threads[0]).toHaveProperty('createdBy')
      });

      it('User registers, logs in, creates a community, creates a thread and finally posts his first message', async () => {
        //REGISTER
        const registerCredentials = {
            username: "mvdc2000",
            firstname: "Mike",
            lastname: "van der Caaij",
            email: "mvdc2000@hotmail.nl",
            dateOfBirth: "2000-07-18",
            password: "Geheim123",
            userImageUrl: "https://findicons.com/files/icons/573/must_have/256/user.png"
        }

        const register = await request(server)
        .post('/auth/register')
        .send(registerCredentials);

        expect(register.body).toHaveProperty('_id')
        expect(register.body).toHaveProperty('username')
        expect(register.body).toHaveProperty('firstname')
        expect(register.body).toHaveProperty('lastname')
        expect(register.body).toHaveProperty('email')
        expect(register.body).toHaveProperty('roles')
        expect(register.body).toHaveProperty('userImageUrl')
        expect(register.body).toHaveProperty('access_token')
        expect(register.body).toHaveProperty('createdCommunities')

        //LOGIN
        const loginCredentials = {
          username: "mvdc2000@hotmail.nl",
          password: "Geheim123",
        }
      
        const login = await request(server)
        .post('/auth/login')
        .send(loginCredentials);

        expect(login.body).toHaveProperty('_id')
        expect(login.body).toHaveProperty('username')
        expect(login.body).toHaveProperty('firstname')
        expect(login.body).toHaveProperty('lastname')
        expect(login.body).toHaveProperty('email')
        expect(login.body).toHaveProperty('roles')
        expect(login.body).toHaveProperty('userImageUrl')
        expect(login.body).toHaveProperty('access_token')
        expect(login.body).toHaveProperty('createdCommunities')

        //CREATE CATEGORY
        const categoryBody = {
          name: "Sport"
        }

        const category = await request(server)
        .post('/categories')
        .send(categoryBody);

        expect(category.body).toHaveProperty('_id')
        expect(category.body).toHaveProperty('name')

        //CREATE COMMUNITY
        const categoryId = category._body._id
        const token = login._body.access_token

        const communityBody = {
          "name": "Nederland",
          "description": "Welkom in de enige Nederlandse community!",
          "imageUrl": "https://tinypng.com/images/social/website.jpg",
          "categories": [categoryId.toString()],
          "isPublic": true
      }
      
        const community = await request(server)
        .post('/communities')
        .set('Authorization', 'bearer ' + token)
        .send(communityBody);

        expect(community.body).toHaveProperty('_id')
        expect(community.body).toHaveProperty('name')
        expect(community.body).toHaveProperty('description')
        expect(community.body).toHaveProperty('creationDate')
        expect(community.body).toHaveProperty('imageUrl')
        expect(community.body).toHaveProperty('isPublic')
        expect(community.body).toHaveProperty('categories')
        expect(community.body).toHaveProperty('participants')
        expect(community.body).toHaveProperty('threads')
        expect(community.body).toHaveProperty('createdBy')

        const communityId = community._body._id

        //CREATE THREAD
        const threadBody = {
          title: "My first thread!",
          content: "This is my first attempt of creating a thread!",
          imageUrl: "https://avatars.githubusercontent.com/u/72087008?s=400&u=cd2a2c12f275c0a3e785c6308e27644ce3fb72d7&v=4",
          externLink: "https://github.com/mikevandercaaij"
      }       

        const thread = await request(server)
        .post(`/communities/${communityId.toString()}/threads`)
        .set('Authorization', 'bearer ' + token)
        .send(threadBody);

        expect(thread.body).toHaveProperty('_id')
        expect(thread.body).toHaveProperty('name')
        expect(thread.body).toHaveProperty('description')
        expect(thread.body).toHaveProperty('creationDate')
        expect(thread.body).toHaveProperty('imageUrl')
        expect(thread.body).toHaveProperty('isPublic')
        expect(thread.body).toHaveProperty('categories')
        expect(thread.body).toHaveProperty('participants')
        expect(thread.body).toHaveProperty('createdBy')
        expect(thread.body).toHaveProperty('threads')
        expect(thread.body.threads[0]).toHaveProperty('_id')
        expect(thread.body.threads[0]).toHaveProperty('title')
        expect(thread.body.threads[0]).toHaveProperty('content')
        expect(thread.body.threads[0]).toHaveProperty('imageUrl')
        expect(thread.body.threads[0]).toHaveProperty('externLink')
        expect(thread.body.threads[0]).toHaveProperty('views')
        expect(thread.body.threads[0]).toHaveProperty('upvotes')
        expect(thread.body.threads[0]).toHaveProperty('publicationDate')
        expect(thread.body.threads[0]).toHaveProperty('messages')
        expect(thread.body.threads[0]).toHaveProperty('createdBy')

        const threadId = thread._body.threads[0]._id

        //CREATE MESSAGE
        const messageBody = {
          text: "Ik ben het hier volkomen mee eens!"
        }       

        const message = await request(server)
        .post(`/communities/${communityId.toString()}/threads/${threadId}/messages`)
        .set('Authorization', 'bearer ' + token)
        .send(messageBody);

        expect(message.body).toHaveProperty('_id')
        expect(message.body).toHaveProperty('text')
        expect(message.body).toHaveProperty('likes')
        expect(message.body).toHaveProperty('publicationDate')
        expect(message.body).toHaveProperty('createdBy')
      });
  });