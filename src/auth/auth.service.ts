import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService
        ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        
        if (user && bcrypt.compareSync(pass,user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }


      async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        const token = this.jwtService.sign(payload)
        this.tokenService.save(token, user.email)
        return {
          access_token: token
        };

        
      }

}
