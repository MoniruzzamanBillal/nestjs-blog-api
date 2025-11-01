import { Injectable } from '@nestjs/common';
import { UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ! for creating a user
  async createUser(payload: CreateUserDto): Promise<UserModel> {
    try {
      const saltRound = 10;
      const hashPassword = await bcrypt.hash(payload?.password, saltRound);

      const result = await this.prisma.userModel.create({
        data: {
          name: payload?.name,
          email: payload?.email,
          password: hashPassword,
        },
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // ! find user by email
  async findUserByEmail(email: string): Promise<UserModel | null> {
    try {
      const result = await this.prisma.userModel.findUnique({
        where: { email },
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // ! find user by id
  async findUserById(id: string): Promise<UserModel | null> {
    try {
      const result = await this.prisma.userModel.findUnique({
        where: { id },
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  //
}
