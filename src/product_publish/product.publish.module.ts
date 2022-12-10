import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import {ProductPublishController}  from './product.publish.controller';
import { productPublishProviders } from './product.publish.providers';
import { ProductPublishService } from './product.publish.service';

@Module({
  imports: [DatabaseModule,forwardRef(()=>AuthModule) ],
  controllers:[ProductPublishController],
  providers: [
    ...productPublishProviders,
    ProductPublishService,
  ],
  exports: [ProductPublishService]
})
export class ProductPublishModule {}