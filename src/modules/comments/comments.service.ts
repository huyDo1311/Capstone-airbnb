import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
// import * as moment from 'moment';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan } =
      createCommentDto;

    console.log({
      maPhong,
      maNguoiBinhLuan,
      ngayBinhLuan,
      noiDung,
      saoBinhLuan,
    });

    // Kiểm tra xem phòng và người dùng có tồn tại không
    const userExists = await this.prisma.nguoiDung.findUnique({
      where: { id: maNguoiBinhLuan },
    });

    if (!userExists) {
      throw new BadRequestException('Người bình luận không tồn tại');
    }

    const roomExists = await this.prisma.phong.findUnique({
      where: { id: maPhong },
    });

    if (!roomExists) {
      throw new BadRequestException('Phòng không tồn tại');
    }

    // Tạo bình luận mới
    const newComment = await this.prisma.binhLuan.create({
      data: {
        ma_phong: maPhong,
        ma_nguoi_binh_luan: maNguoiBinhLuan,
        ngay_binh_luan: new Date(ngayBinhLuan).toISOString(),
        noi_dung: noiDung,
        sao_binh_luan: saoBinhLuan,
      },
    });

    return {
      content: newComment,
    };
  }

  async findAll() {
    const comments = await this.prisma.binhLuan.findMany();
    // console.log({comments})
    return comments;
  }

  async findOne(roomId: number) {
    // console.log(roomId);

    const comments = await this.prisma.binhLuan.findMany({
      where: { ma_phong: roomId },
    });

    return comments;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const existingComment = await this.prisma.binhLuan.findUnique({
      where: { id },
    });
    if (!existingComment)
      throw new NotFoundException(`Không tìm thấy bình luận với ID ${id}`);

    const comment = await this.prisma.binhLuan.update({
      where: { id },
      data: {
        ngay_binh_luan: updateCommentDto.ngayBinhLuan,
        noi_dung: updateCommentDto.noiDung,
        sao_binh_luan: updateCommentDto.saoBinhLuan,
        Phong: updateCommentDto.maPhong
          ? { connect: { id: updateCommentDto.maPhong } }
          : undefined,
        NguoiDung: updateCommentDto.maNguoiBinhLuan
          ? { connect: { id: updateCommentDto.maNguoiBinhLuan } }
          : undefined,
      },
    });

    return comment;
  }

  async remove(id: number) {
    const existingComment = await this.prisma.binhLuan.findUnique({
      where: { id },
    });
    if (!existingComment)
      throw new NotFoundException(`Không tìm thấy bình luận với ID ${id}`);

    await this.prisma.binhLuan.delete({ where: { id } });

    return { message: `Bình luận #${id} đã được xóa thành công` };
  }
}
