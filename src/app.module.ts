import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './user/users.controller';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
