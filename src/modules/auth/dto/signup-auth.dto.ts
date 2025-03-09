import { IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  birthday: string;

  @IsBoolean()
  @ApiProperty()
  gender: boolean;

  @IsString()
  @ApiProperty()
  @IsOptional() // Nếu role không bắt buộc
  role?: string;
}
