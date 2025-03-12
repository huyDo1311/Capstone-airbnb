import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsString, IsEmail, IsBoolean} from 'class-validator';

export class UpdateUserDto {
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
      @Transform(({ value }) => {
        if (value === '1' || value === 1 || value === true) return true;
        if (value === '0' || value === 0 || value === false) return false;
        throw new Error('Giới tính chỉ chấp nhận giá trị 1 (male), 0 (female), true (male), hoặc false (female)');
      })
      @IsBoolean()
      gender: boolean;
    
    
      @IsString()
      @ApiProperty()
    //   @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
      role: string;
}
