import { Injectable, Inject } from '@nestjs/common';
import { ResultDTO } from 'src/result.dto';
import { Repository } from 'typeorm';
//import { UserAddDTO } from './dto/user.create.dto';
import Publish from './publish.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class PublishService {
  constructor(
    @Inject('PUBLISH_REPOSITORY')
    private publishRepository: Repository<Publish>,
  ) {}

  async findAll(): Promise<Publish[]> {
    return this.publishRepository.find();
  }

  

  
/*
  async findOne(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOneBy({email:email});
  }
*/

}