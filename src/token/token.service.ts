import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { Token } from './token.entity';
import { UsersService } from 'src/user/users.service';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class TokenService {
  constructor(
    
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private usersService: UsersService,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

    async save (hash: string, username: string) {
      let token = {username: username, hash: hash}
      let objToken = await this.tokenRepository.findOneBy({username:username} )
      if (objToken) {
        this.tokenRepository.update(objToken.id,{hash: hash})
      } else {
        this.tokenRepository.insert({
          hash:hash,
          username: username
  
        })
      }
    
    }

    async refreshToken (oldToken: string) {
      let objToken = await this.tokenRepository.findOneBy({hash:oldToken} )
      if (objToken) {
        
        let userLogin = await this.usersService.findOne(objToken.username)

        return this.authService.login(userLogin) 


      } else {
        return new HttpException({
          errorMessage: 'Invalid token'
        }, HttpStatus.UNAUTHORIZED)
      }
    }

}