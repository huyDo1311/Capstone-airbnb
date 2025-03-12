import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @ApiProperty()
  maPhong: number;

  @IsDateString()
  @ApiProperty()
  ngayDen: string;

  @IsDateString()
  @ApiProperty()
  ngayDi: string;

  @IsInt()
  @Min(1)
  @ApiProperty()
  soLuongKhach: number;

  @IsInt()
  @ApiProperty()
  maNguoiDat: number;
}
