import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const { maPhong, maNguoiDat, ngayDen, ngayDi, soLuongKhach } =
      createBookingDto;


    const userExists = await this.prisma.nguoiDung.findUnique({
      where: { id: maNguoiDat },
    });

    if (!userExists) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    const roomExists = await this.prisma.phong.findUnique({
      where: { id: maPhong },
    });

    if (!roomExists) {
      throw new BadRequestException('Phòng không tồn tại');
    }

    const overlappingBooking = await this.prisma.datPhong.findFirst({
      where: {
        ma_phong: maPhong,
        OR: [
          {
            ngay_den: { lte: ngayDi },
            ngay_di: { gte: ngayDen },
          },
        ],
      },
    });

    if (overlappingBooking) {
      throw new BadRequestException(
        'Phòng đã được đặt trong khoảng thời gian này',
      );
    }

    const newBooking = await this.prisma.datPhong.create({
      data: {
        ma_phong: maPhong,
        ma_nguoi_dat: maNguoiDat,
        ngay_den: new Date(ngayDen).toISOString(),
        ngay_di: new Date(ngayDi).toISOString(),
        so_luong_khach: soLuongKhach,
      },
    });

    return newBooking;
  }

  async findAll() {
    const bookings = await this.prisma.datPhong.findMany();
    // console.log({comments})
    return bookings;
  }

  async findOne(id: number) {
    const booking = await this.prisma.datPhong.findMany({
      where: { id: id },
    });

    return booking;
  }

  async getbookingbyuser(id: number) {
    const userExists = await this.prisma.nguoiDung.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}`);
    }

    const bookings = await this.prisma.datPhong.findMany({
      where: { ma_nguoi_dat: id },
      include: {
        Phong: true, 
      },
    });

    return bookings;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const existingBooking = await this.prisma.datPhong.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      throw new NotFoundException(`Không tìm thấy đặt phòng với ID ${id}`);
    }

    const updatedBooking = await this.prisma.datPhong.update({
      where: { id },
      data: {
        ngay_den: updateBookingDto.ngayDen
          ? new Date(updateBookingDto.ngayDen).toISOString()
          : undefined,
        ngay_di: updateBookingDto.ngayDi
          ? new Date(updateBookingDto.ngayDi).toISOString()
          : undefined,
        so_luong_khach: updateBookingDto.soLuongKhach,
        Phong: updateBookingDto.maPhong
          ? { connect: { id: updateBookingDto.maPhong } }
          : undefined,
        NguoiDung: updateBookingDto.maNguoiDat
          ? { connect: { id: updateBookingDto.maNguoiDat } }
          : undefined,
      },
    });

    return updatedBooking;
  }

  async remove(id: number) {
    const existingComment = await this.prisma.datPhong.findUnique({
      where: { id },
    });
    if (!existingComment)
      throw new NotFoundException(`Không tìm thấy đặt bòng với ID ${id}`);

    await this.prisma.datPhong.delete({ where: { id } });

    return { message: `Đặt phòng #${id} đã được xóa thành công` };
  }
}
