import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateLocationDto {
//   @IsInt()
//   @ApiProperty({ description: 'ID của vị trí' })
//   id: number;

  @IsString()
  @ApiProperty({ description: 'Tên vị trí' })
  tenViTri: string;

  @IsString()
  @ApiProperty({ description: 'Tỉnh/Thành phố' })
  tinhThanh: string;

  @IsString()
  @ApiProperty({ description: 'Quốc gia' })
  quocGia: string;

  @IsString()
  @ApiProperty({ description: 'Hình ảnh vị trí' })
  hinhAnh: string;
}

