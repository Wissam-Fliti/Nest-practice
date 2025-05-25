import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service';
import { UserDocument } from './user.schema';

@Controller({path: 'users', version: ['1']})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id:string): Promise<UserDocument | null>  {
    return this.usersService.findOne(id)
  }
}
