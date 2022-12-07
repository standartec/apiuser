import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDTO } from 'src/result.dto';
import { UserAddDTO } from './dto/user.create.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<Users[]> {

    return this.usersService.findAll();
  }

  @Post('add')
  async add(@Body() data:UserAddDTO): Promise<any> {
    
    return this.usersService.add(data)
 
   
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);

   // return req.user;
  }
  
}