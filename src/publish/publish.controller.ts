import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDTO } from 'src/result.dto';
//import { UserAddDTO } from './dto/user.create.dto';
import  Publish  from './publish.entity';
import { PublishService } from './publish.service';

@Controller('publish')
export class PublishController {
  constructor(private readonly publishService: PublishService,
    private authService: AuthService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async getPublish(): Promise<Publish[]> {

    return this.publishService.findAll();
  }

  /*
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
  */
}