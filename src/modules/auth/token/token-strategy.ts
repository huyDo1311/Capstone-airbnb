
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {ACCESS_TOKEN_SECRET} from '../../../common/constant/app.constant';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CheckTokenStrategy extends PassportStrategy(Strategy, `check-token`) {
  constructor(public prisma: PrismaService, ) 
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET as string,
    });
  }

  async validate(payload: any) {
    // console.log(`TOKEN - validate`)
    // console.log({payload})
    const user = await this.prisma.nguoiDung.findUnique({
      where: {
        id: payload.userId
      }
    })
    return user;
  }
}
