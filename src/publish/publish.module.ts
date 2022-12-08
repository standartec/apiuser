import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import {PublishController}  from './publish.controller';
import { publishProviders } from './publish.providers';
import { PublishService } from './publish.service';

@Module({
  imports: [DatabaseModule,forwardRef(()=>AuthModule) ],
  controllers:[PublishController],
  providers: [
    ...publishProviders,
    PublishService,
  ],
  exports: [PublishService]
})
export class PublishModule {}