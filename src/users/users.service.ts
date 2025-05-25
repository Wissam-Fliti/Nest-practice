import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from '../dto/pagination.dto';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 2, page = 1 } = paginationDto;
    const totalRecords = await this.userModel.countDocuments().exec();
    const totalPages = Math.floor((totalRecords - 1) / limit) + 1;
    const skip = limit * (page - 1);
    const users = await this.userModel.find().limit(limit).skip(skip).exec();

    return {
      data: users,
      totalRecords,
      totalPages,
      currentPage: page
    }
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
}
