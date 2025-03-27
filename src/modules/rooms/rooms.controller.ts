import {Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Public } from 'src/common/decorators/is-public.decorator';
import { SkipPermission } from 'src/common/decorators/skip-permission.decorator';
import {ApiBody, ApiConsumes, ApiBearerAuth, ApiQuery} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {FileUploadDto} from '../users/dto/file-upload.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Public()
  @SkipPermission()
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(`location`)
  findRoomByLocation(@Query() query: any) {
    return this.roomsService.findRoomByLocation(query);
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
      return this.roomsService.getPaginated(query);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }

    @UseInterceptors(FileInterceptor('room'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'List of cats',
        type: FileUploadDto,
      })
    @Post(`room-cloud`)
    async roomCloud(@UploadedFile() file) {
        return await this.roomsService.roomCloud(file);
    }
}
