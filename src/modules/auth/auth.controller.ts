import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUserDto';
import { LoginUserDto } from '../user/dto/loginUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ! register
  @Post('register')
  async registerUser(@Body() payload: CreateUserDto) {
    const result = await this.authService.registerUser(payload);

    return {
      success: true,
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  @Post('login')
  async loginUser(@Body() payload: LoginUserDto) {
    const userData = await this.authService.validateUser(
      payload?.email,
      payload?.password,
    );

    if (!userData) {
      throw new Error('Invalid credentials');
    }

    const result = await this.authService.loginUser(userData);

    return {
      success: true,
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  //
}
