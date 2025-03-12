import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateUserDto {
//   @IsInt()
//   @ApiProperty()
//   id: number;

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

  @ApiProperty({ description: 'Giới tính: true (male) / false (female) hoặc 1 (male) / 0 (female)' })
  @Transform(({ value }) => value === '1' || value === 1 || value === true)
  @IsBoolean()
  gender: boolean;


  @IsString()
  @ApiProperty()
//   @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
  role: string;
}
