import { Injectable, Inject } from '@nestjs/common';
import { ResultDTO } from 'src/result.dto';
import { Repository } from 'typeorm';
import { UserAddDTO } from './dto/user.create.dto';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async add (data: UserAddDTO): Promise<ResultDTO> {
    let user = new Users()
    user.email = data.email
    user.first_name = data.first_name
    user.created_on = 1268889823
    user.company = data.company
    user.ip_address = 1
    user.password = bcrypt.hashSync(data.password, 8) 
    user.phone = data.phone
    console.log("Call Service")
    console.log(user)
    return this.usersRepository.save(user).then((result) => {
        return <ResultDTO> {
            status:true,
            message: "User included with success!!"
        }
    }).catch((error) => {
        return <ResultDTO> {
            status:false,
            message: "Error"
        }
    })

  

  }

  async findOne(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOneBy({email:email});
  }


}