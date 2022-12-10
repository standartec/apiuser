import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDTO } from 'src/result.dto';
import { IncludeProductPublishDTO } from './dto/include.product.publish.dto';
import { ProductPublishService } from './product.publish.service';

@Controller('product_publish')
export class ProductPublishController {
  constructor(private readonly productPublishService: ProductPublishService,
    private authService: AuthService) {}

  @Post('addProductPublish')
  async addProductPublish(@Body() data:IncludeProductPublishDTO): Promise<any> {
    console.log("Controller")
    console.log(data)
    return this.productPublishService.addProductPublish(data)
 
  }
  
}