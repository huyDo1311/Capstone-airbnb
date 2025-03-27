import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    const { tenViTri, tinhThanh, quocGia, hinhAnh } = createLocationDto;

    // Kiểm tra xem vị trí đã tồn tại chưa
    const locationExists = await this.prisma.viTri.findFirst({
      where: { ten_vi_tri: tenViTri },
    });

    if (locationExists) {
      throw new BadRequestException('Tên vị trí này đã tồn tại');
    }

    // Thêm mới vị trí vào database
    const newLocation = await this.prisma.viTri.create({
      data: {
        ten_vi_tri: tenViTri,
        tinh_thanh: tinhThanh,
        quoc_gia: quocGia,
        hinh_anh: hinhAnh,
      },
    });

    return newLocation;
  }

  async findAll() {
    const locations = await this.prisma.viTri.findMany();
    // console.log({comments})
    return locations;
  }

  async getPaginated(query: any) {
    let { page, pageSize, type_id, search } = query;
    console.log({ page, pageSize, type_id, search });

    page = Number(page) > 0 ? Number(page) : 1;
    pageSize = Number(pageSize) > 0 ? Number(pageSize) : 10;
    type_id = Number(type_id) > 0 ? Number(type_id) : 0;
    search = search?.trim() || '';

    console.log({ page, pageSize, type_id, search });

    const whereCondition: any = {
      ...(type_id !== 0 && { type_id }),
      ...(search && { ten_vi_tri: { contains: search } }),
    };

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.viTri.count({
      where: whereCondition,
    });
    const totalPage = Math.ceil(totalItem / pageSize);

    const users = await this.prisma.viTri.findMany({
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
      items: users,
    };
  }

  async findOne(id: number) {
    const location = await this.prisma.viTri.findMany({
      where: { id: id },
    });

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const viTriExists = await this.prisma.viTri.findUnique({
      where: { id },
    });

    if (!viTriExists) {
      throw new NotFoundException(`Vị trí có ID ${id} không tồn tại`);
    }

    try {
      const updatedViTri = await this.prisma.viTri.update({
        where: { id },
        data: {
          ten_vi_tri: updateLocationDto.tenViTri,
          tinh_thanh: updateLocationDto.tinhThanh,
          quoc_gia: updateLocationDto.quocGia,
          hinh_anh: updateLocationDto.hinhAnh,
        },
      });

      return updatedViTri;
    } catch (error) {
      throw new BadRequestException('Cập nhật vị trí thất bại');
    }
  }

  async remove(id: number) {
    const locationExists = await this.prisma.viTri.findUnique({
      where: { id },
    });
  
    if (!locationExists) {
      throw new NotFoundException(`Không tìm thấy vị trí với ID ${id}`);
    }
  
    await this.prisma.viTri.delete({
      where: { id },
    });
  
    return { message: `Vị trí có ID ${id} đã được xóa thành công` };
  }

  async locationPictureCloud(file) {
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
        .upload_stream({ folder: 'locations' }, (error, uploadResult) => {
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
