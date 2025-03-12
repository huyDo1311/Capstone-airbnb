import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiBearerAuth, ApiQuery, ApiBody, ApiConsumes} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(`paginate`)
  @ApiBearerAuth()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  getPaginated(
    @Query()
    query: any,
  ) {
    return this.usersService.getPaginated(query);
  }

  @ApiBearerAuth()
  @Get('search/:name')
  findWithName(@Param('name') name: string) {
    return this.usersService.findWithName(name);
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
      description: 'List of cats',
      type: FileUploadDto,
    })
  @Post(`avatar-cloud`)
  async avatarCloud(@UploadedFile() file) {
      return await this.usersService.avatarCloud(file);
  }
}
