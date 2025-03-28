import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, birthday, gender, role } =
      createUserDto;

    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const formattedRole =
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        name,
        email,
        pass_word: hashedPassword,
        phone,
        birth_day: new Date(birthday).toISOString(),
        gender: gender ? 'Male' : 'Female',
        role: formattedRole,
      },
    });

    return newUser;
  }

  async findAll() {
    const users = await this.prisma.nguoiDung.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    return users;
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
      ...(search && { name: { contains: search } }),
    };

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.nguoiDung.count({
      where: whereCondition,
    });
    const totalPage = Math.ceil(totalItem / pageSize);

    const users = await this.prisma.nguoiDung.findMany({
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

  async findWithName(name: string) {
    const users = await this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: name
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    return users;
  }

  async findOneUser(id: number) {
    const user = await this.prisma.nguoiDung.findMany({
      where: { id: id },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}`);
    }

    const genderValue = updateUserDto.gender as
      | boolean
      | number
      | string
      | null
      | undefined;

    const hashedPassword = bcrypt.hashSync(updateUserDto.password, 10);

    const updatedUser = await this.prisma.nguoiDung.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        pass_word: hashedPassword,
        birth_day: updateUserDto.birthday,
        role: updateUserDto.role,
        gender:
          genderValue === true || genderValue === 1
            ? 'Male'
            : genderValue === false || genderValue === 0
              ? 'Female'
              : typeof genderValue === 'string'
                ? genderValue
                : undefined,
      },
    });

    return {
      name: updateUserDto.name,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
      // pass_word: hashedPassword,
      birth_day: updateUserDto.birthday,
      role: updateUserDto.role,
      gender:
        genderValue === true || genderValue === 1
          ? 'Male'
          : genderValue === false || genderValue === 0
            ? 'Female'
            : typeof genderValue === 'string'
              ? genderValue
              : undefined,
    };
  }

  async remove(id: number) {
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID ${id}`);
    }

    await this.prisma.nguoiDung.delete({ where: { id } });

    return { message: `Người dùng #${id} đã được xóa thành công` };
  }

  async avatarCloud(file) {

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
        .upload_stream({ folder: 'images' }, (error, uploadResult) => {
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
