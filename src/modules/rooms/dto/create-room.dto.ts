import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, Min } from 'class-validator';

export class CreateRoomDto {
//   @IsInt()
//   @ApiProperty()
//   id: number;

  @IsString()
  @ApiProperty()
  tenPhong: string;

  @IsInt()
  @Min(1)
  @ApiProperty()
  khach: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  phongNgu: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  giuong: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  phongTam: number;

  @IsString()
  @ApiProperty()
  moTa: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  giaTien: number;

  @IsBoolean()
  @ApiProperty()
  mayGiat: boolean;

  @IsBoolean()
  @ApiProperty()
  banLa: boolean;

  @IsBoolean()
  @ApiProperty()
  tivi: boolean;

  @IsBoolean()
  @ApiProperty()
  dieuHoa: boolean;

  @IsBoolean()
  @ApiProperty()
  wifi: boolean;

  @IsBoolean()
  @ApiProperty()
  bep: boolean;

  @IsBoolean()
  @ApiProperty()
  doXe: boolean;

  @IsBoolean()
  @ApiProperty()
  hoBoi: boolean;

  @IsBoolean()
  @ApiProperty()
  banUi: boolean;

  @IsInt()
  @ApiProperty()
  maViTri: number;

  @IsString()
  @ApiProperty()
  hinhAnh: string;
}
