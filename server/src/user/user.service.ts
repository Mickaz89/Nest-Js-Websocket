import { Model, now } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly eventsGatewayService: EventsGateway,
    ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async login(name): Promise<boolean> {
    const user = await this.userModel.findOne({ name }).exec();
    return user ? true : false;
  }

  async updateStatus(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ name: username });
    user.status = updateUserDto.status;
    user.updatedAt = now();
    const updatedUser = await user.save();

    // Emit event
    this.eventsGatewayService.server.emit('events', updateUserDto.status);

    return updatedUser
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ name: username });
    return user;
  }
}
