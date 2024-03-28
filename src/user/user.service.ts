import {  BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { Payload } from 'src/auth/dto/payload.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(USER_MODEL) readonly _usrModel: Model<UserDocument>,
      ) {}
      async createUser(user: CreateUserDto) {
        try {
          const newUser = await this._usrModel.create(user);
          return newUser;
        } catch (error) {
          if (error.code === 11000) {
            throw new BadRequestException(
              'Duplicate key error: The user with  email already exists.',
            );
          } else
            throw new InternalServerErrorException(
              error?.message ?? 'internal server error',
            );
        }
      }
      async updateUserById(user: UpdateUserDTO, id: string) {
        try {
          if (user.password) {
            user.password = await hash(user.password, 10);
          }else{
            delete user.password
          }
          const updatedUser = await this._usrModel.findByIdAndUpdate(id, user);
          return updatedUser;
        } catch (error) {
          if (error.code === 11000) {
            throw new BadRequestException(
              'Duplicate key error: The user with  email already exists.',
            );
          } else
            throw new InternalServerErrorException(
              error?.message ?? 'internal server error',
            );
        }
      }
      async deleteUserById(id: string) {
        try {
          const user = await this._usrModel.findByIdAndDelete(id);
          return user;
        } catch (error) {
          throw new InternalServerErrorException();
        }
      }
      async getUsers(role?: CreateUserDto) {
        try {
          const filter = role ? { role } : {};
          const users = await this._usrModel.find(filter).sort({createdAt:-1});
          return users;
        } catch (error) {
          throw new InternalServerErrorException();
        }
      }
      async getUsersById(id: Payload['id']) {
        try {
          return await this._usrModel.findById(id);
        } catch (error) {
          throw new InternalServerErrorException();
        }
      }
      async getUsersByEmail(email: Payload['email']) {
        try {
          return await this._usrModel.findOne({ email });
        } catch (error) {
          throw new InternalServerErrorException();
        }
      }
}
