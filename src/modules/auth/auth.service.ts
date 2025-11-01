import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //  ! for validating a user
  async validateUser(email: string, pass: string): Promise<UserModel | null> {
    try {
      const userData = await this.userService.findUserByEmail(email);

      if (!userData) {
        return null;
      }

      const isMatched = await bcrypt.compare(pass, userData?.password);

      if (!isMatched) {
        return null;
      }

      const { password, ...safeData } = userData;

      return safeData as UserModel;
    } catch (error) {
      throw new Error(error);
    }
  }

  //   ! for login
  async loginUser(user: { id: string; email: string }) {
    const payload = { userId: user?.id, email: user?.email };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  //   ! for registering a user
  async registerUser(payload: CreateUserDto) {
    try {
      const existingUser = await this.userService.findUserByEmail(
        payload?.email,
      );

      if (existingUser) {
        throw new UnauthorizedException('Email already in use');
      }

      const result = await this.userService.createUser(payload);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  //
}
