import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, Min, Max } from 'class-validator';
export class CreateCommentDto {
    @IsInt()
    @ApiProperty()
    maPhong: number;
  
    @IsInt()
    @ApiProperty()
    maNguoiBinhLuan: number;
  
    @IsDateString()
    @ApiProperty()
    ngayBinhLuan: string;
  
    @IsString()
    @ApiProperty()
    noiDung: string;
  
    @IsInt()
    @Min(1)
    @Max(5)
    @ApiProperty()
    saoBinhLuan: number;
}
