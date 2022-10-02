import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Status } from '../user.schema';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEnum(Status)
  status: Status;
}

export class UpdateUserDto {
  @IsEnum(Status)
  status: Status;
}
