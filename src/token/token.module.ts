import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { DatabaseModule } from '../database/database.module';
import { TokenController } from './token.controller';
import { tokenProviders } from './token.providers';
import { TokenService } from './token.service';

@Module({
  imports: [DatabaseModule,forwardRef(()=>AuthModule),UsersModule ],
  controllers:[TokenController],
  providers: [
    ...tokenProviders,
    TokenService,
  ],
  exports: [TokenService]
})
export class TokenModule {}

