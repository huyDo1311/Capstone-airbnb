import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/signin-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    public prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { name, email, password, phone, birthday, gender, role } = signUpDto;

    // console.log({ name, email, password, phone, birthday, gender, role });

    const userExists = await this.prisma.nguoiDung.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        name,
        email,
        pass_word: hashedPassword,
        phone,
        birth_day: birthday,
        gender: gender ? 'Male' : 'Female',
        role: role || 'User',
      },
    });

    const tokens = this.createTokens(newUser.id);

    return {
      message: 'Đăng ký thành công',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        birthday: newUser.birth_day,
        gender: newUser.gender,
        role: newUser.role,
      },
      tokens,
    };
  }

  async signin(signInDto: SignInDto) {
    const { email, pass_word } = signInDto;
    console.log({ email, pass_word });
    const userExists = await this.prisma.nguoiDung.findFirst({
      where: {
        email: email,
      },
    });

    // const passHash = bcrypt.hashSync(pass_word, 10)

    // console.log({passHash})

    if (!userExists) {
      throw new BadRequestException(`Tài khoản chưa tồn tại`);
    }

    if (!userExists.pass_word) {
      throw new BadRequestException(
        `Không hợp lệ, vui lòng liên hệ chăm sóc khách hàng`,
      );
    }
    // npm i bcrypt
    const isPassword = bcrypt.compareSync(pass_word, userExists.pass_word);

    if (!isPassword) {
      throw new BadRequestException(`Mật khẩu không chính xác`);
    }

    // this.createTokens
    const tokens = this.createTokens(userExists.id);
    // const accessToken = this.createTokens({ userid: userExists.id })

    return tokens;
  }

  createTokens(userId: number) {
    if (!userId) throw new BadRequestException(`Tài khoản không hợp lệ:: 1`);
    // npm install --save @nestjs/jwt
    const accessToken = this.jwt.sign(
      { userId: userId },
      {
        expiresIn: ACCESS_TOKEN_EXPIRED,
        secret: ACCESS_TOKEN_SECRET,
      },
    );

    const refreshToken = this.jwt.sign(
      { userId: userId },
      {
        expiresIn: REFRESH_TOKEN_EXPIRED,
        secret: REFRESH_TOKEN_SECRET,
      },
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
