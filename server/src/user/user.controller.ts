import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsGateway } from 'src/events/events.gateway';
import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly userService: UserService,
    private readonly eventsGatewayService: EventsGateway,
  ) {}

  @Post('/login')
  login(@Body() filter: any) {
    return this.userService.login(filter.name);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @Patch('/:username')
  updateStatus(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = this.userService.updateStatus(username, updateUserDto);
    this.eventsGatewayService.server.emit('events', updateUserDto.status);
    return user;
  }
}
