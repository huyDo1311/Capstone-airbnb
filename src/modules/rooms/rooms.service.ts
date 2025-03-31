import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}
  async create(createRoomDto: CreateRoomDto) {
    const {
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      moTa,
      giaTien,
      mayGiat,
      banLa,
      tivi,
      dieuHoa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      hinhAnh,
      maViTri,
    } = createRoomDto;

    const locationExists = await this.prisma.viTri.findUnique({
      where: { id: maViTri },
    });

    if (!locationExists) {
      throw new BadRequestException('Vị trí không tồn tại');
    }

    // const hinhAnhCoud = await this.roomCloud(file)

    const newRoom = await this.prisma.phong.create({
      data: {
        ten_phong: tenPhong,
        khach: khach,
        phong_ngu: phongNgu,
        giuong: giuong,
        phong_tam: phongTam,
        mo_ta: moTa,
        gia_tien: giaTien,
        may_giat: mayGiat,
        ban_la: banLa,
        tivi: tivi,
        dieu_hoa: dieuHoa,
        wifi: wifi,
        bep: bep,
        do_xe: doXe,
        ho_boi: hoBoi,
        ban_ui: banUi,
        hinh_anh: hinhAnh,
        ma_vi_tri: maViTri,
      },
    });

    return newRoom;
  }

  async findAll() {
    const bookings = await this.prisma.phong.findMany();
    // console.log({comments})
    return bookings;
  }

  async findRoomByLocation(query: any) {
    const locationId = Number(query.id);

    if (isNaN(locationId)) {
      throw new BadRequestException('Mã vị trí không hợp lệ, phải là một số');
    }

    const rooms = await this.prisma.phong.findMany({
      where: {
        ma_vi_tri: locationId,
      },
      select: {
        id: true,
        ten_phong: true,
        khach: true,
        phong_ngu: true,
        giuong: true,
        phong_tam: true,
        mo_ta: true,
        gia_tien: true,
        may_giat: true,
        ban_la: true,
        tivi: true,
        dieu_hoa: true,
        wifi: true,
        bep: true,
        do_xe: true,
        ho_boi: true,
        ban_ui: true,
        ma_vi_tri: true,
        hinh_anh: true,
      },
    });

    return rooms;
  }

  async getPaginated(query: any) {
    let { page, pageSize, type_id, search } = query;

    page = Number(page) > 0 ? Number(page) : 1;
    pageSize = Number(pageSize) > 0 ? Number(pageSize) : 10;
    type_id = Number(type_id) > 0 ? Number(type_id) : 0;
    search = search?.trim() || '';


    const whereCondition: any = {
      ...(type_id !== 0 && { type_id }),
      ...(search && { ten_phong: { contains: search } }),
    };

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.phong.count({
      where: whereCondition,
    });
    const totalPage = Math.ceil(totalItem / pageSize);

    const rooms = await this.prisma.phong.findMany({
      take: pageSize,
      skip,
      orderBy: {
        created_at: 'desc', 
      },
      where: whereCondition,
    });

    return {
      page,
      pageSize,
      totalPage,
      totalItem,
      items: rooms,
    };
  }

  async findOne(id: number) {
    const room = await this.prisma.phong.findMany({
      where: { id: id },
    });

    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const roomExists = await this.prisma.phong.findUnique({
      where: { id },
    });
  
    if (!roomExists) {
      throw new NotFoundException(`Phòng có ID ${id} không tồn tại`);
    }
  
    try {
      const updatedRoom = await this.prisma.phong.update({
        where: { id },
        data: {
          ten_phong: updateRoomDto.tenPhong,
          khach: updateRoomDto.khach,
          phong_ngu: updateRoomDto.phongNgu,
          giuong: updateRoomDto.giuong,
          phong_tam: updateRoomDto.phongTam,
          mo_ta: updateRoomDto.moTa,
          gia_tien: updateRoomDto.giaTien,
          may_giat: updateRoomDto.mayGiat,
          ban_la: updateRoomDto.banLa,
          tivi: updateRoomDto.tivi,
          dieu_hoa: updateRoomDto.dieuHoa,
          wifi: updateRoomDto.wifi,
          bep: updateRoomDto.bep,
          do_xe: updateRoomDto.doXe,
          ho_boi: updateRoomDto.hoBoi,
          ban_ui: updateRoomDto.banUi,
          ma_vi_tri: updateRoomDto.maViTri,
          hinh_anh: updateRoomDto.hinhAnh,
        },
      });
  
      return updatedRoom;
    } catch (error) {
      throw new BadRequestException('Cập nhật phòng thất bại');
    }
  }

  async remove(id: number) {
    const roomExists = await this.prisma.phong.findUnique({
      where: { id },
    });
  
    if (!roomExists) {
      throw new NotFoundException(`Không tìm thấy phòng với ID ${id}`);
    }
  
    await this.prisma.phong.delete({
      where: { id },
    });
  
    return { message: `Phòng có ID ${id} đã được xóa thành công` };
  }

  async roomCloud(file) {
    if (!file)
      throw new BadRequestException(
        `Vui lòng gửi hình ảnh lên thoong qua key file (from-data)`,
      );

    // const userId = req.user.user_id;

    // Configuration
    cloudinary.config({
      cloud_name: 'dvob9vwi8',
      api_key: '211523325822865',
      api_secret: `OjKvjUndllwW25a46CzAbQlbGKM`, // Click 'View API Keys' above to copy your API secret
    });

    const uploadResult: any = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream({ folder: 'room' }, (error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(file.buffer);
    });

    // console.log({uploadResult});

    // await prisma.users.update({
    //   where: {
    //     user_id: Number(userId),
    //   },
    //   data: {
    //     avatar: uploadResult.secure_url,
    //   },
    // });

    return {
      folder: uploadResult.asset_folder,
      filename: file.filename,
      imgUrl: uploadResult.secure_url,
    };

    // return `upload cloud`
  }
}
