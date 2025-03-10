import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TokenCheck } from '../auth/token/token-check';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/common/decorators/is-public.decorator';
import { SkipPermission } from 'src/common/decorators/skip-permission.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @Public()
  @SkipPermission()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('room/:roomId')
  @Public()
  @SkipPermission()
  findOne(@Param('roomId') roomId: string) {
    return this.commentsService.findOne(+roomId);
  }

  @UseGuards(TokenCheck)
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
