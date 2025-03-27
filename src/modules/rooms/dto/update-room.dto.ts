import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, Min } from 'class-validator';

export class UpdateRoomDto {
//   @IsInt()
//   @ApiProperty({ description: 'ID của phòng' })
//   id: number;

  @IsString()
  @ApiProperty({ description: 'Tên phòng' })
  tenPhong: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Số lượng khách tối đa' })
  khach: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ description: 'Số phòng ngủ' })
  phongNgu: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ description: 'Số giường' })
  giuong: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ description: 'Số phòng tắm' })
  phongTam: number;

  @IsString()
  @ApiProperty({ description: 'Mô tả về phòng' })
  moTa: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ description: 'Giá tiền thuê phòng' })
  giaTien: number;

  @IsBoolean()
  @ApiProperty({ description: 'Có máy giặt hay không' })
  mayGiat: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Có bàn là hay không' })
  banLa: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Có tivi hay không' })
  tivi: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Có điều hòa hay không' })
  dieuHoa: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Có wifi hay không' })
  wifi: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Có bếp hay không' })
  bep: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Có chỗ đỗ xe hay không' })
  doXe: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Có hồ bơi hay không' })
  hoBoi: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Có bàn ủi hay không' })
  banUi: boolean;

  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Mã vị trí của phòng' })
  maViTri: number;

  @IsString()
  @ApiProperty({ description: 'URL hình ảnh của phòng' })
  hinhAnh: string;
}
