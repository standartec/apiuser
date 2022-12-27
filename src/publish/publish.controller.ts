import { IncludePublishDTO } from './dto/include.publish.dto';
import { Body, Controller, Get, Post, UseGuards,Request, Param } from '@nestjs/common';
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

  @Get('getUserPublish/:idUser')
  async getUserPublish(@Param('idUser') iduser): Promise<undefined[]> {
    console.log(iduser)
      return this.publishService.getUserPublish(iduser)
  }

  @Get('getProductPublish/:idPublish')
  async getProductPublish (@Param('idPublish') idPublish): Promise<undefined[]> {
    return this.publishService.getProductPublish(idPublish)
  }

  @Get('getProductUser/:idUser/:idPublish/:name') 
  async getProductUser (@Param() params ): Promise<undefined[]>{
    console.log(params)
    return this.publishService.getProductUser(params.idUser,params.idPublish,params.name)
  }

  @Get('getTemplate/:idUser')
  async getTemplate (@Param('idUser') idUser): Promise<undefined[]> {

    return this.publishService.getTemplate(idUser)

  }

  @Post('includePublish')
  async includePublish(@Body() data:IncludePublishDTO): Promise<any> {
    console.log("Controller")
    console.log(data)
    return this.publishService.includePublish(data)
 
  }



}