import { ProductPublishModule } from './../product_publish/product.publish.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/user/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { TokenModule } from 'src/token/token.module';
import { PublishModule } from 'src/publish/publish.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TokenModule,
    PublishModule,
    ProductPublishModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [JwtModule,AuthService],
})

export class AuthModule {}
