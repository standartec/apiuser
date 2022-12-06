import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResultDTO } from 'src/result.dto';
import { UserAddDTO } from './dto/user.create.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  async getUsers(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Post('add')
  async add(@Body() data:UserAddDTO): Promise<any> {
    console.log("Call Controller")
    console.log(data)
    
    return this.usersService.add(data)

   
  }
}