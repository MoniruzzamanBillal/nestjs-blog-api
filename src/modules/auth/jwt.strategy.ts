import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    try {
      const userData = await this.userService.findUserById(payload?.id);

      if (!userData) {
        return null;
      }

      const { password, ...userSafeData } = userData;

      return userSafeData;
    } catch (error) {
      throw new Error(error);
    }

    //
  }
}
