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

      this.insertProductDefalt(result.id, 1)

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

  
   

    async insertProductDefalt(idUser, shop_type) {
      let idcathegory = 1
        /*
        1 Supermercado - OK
        2 Açougue - OK
        3 Verdurão - ok
        4 Cosméticos - OK
        5 Hamburgeria - ok
        6 Restaurante - ok
        7 Distribuidora de Bebidas - OK
        8 Loja de Ferragens - OK
        9 - Papelaria - OK
        10 - Eletrodomésticos - OK
        11 - Panificadora - OK 
        99 Outros                      
        */
       /*
        if (shop_type != 99) {
          if (shop_type == 1) {
              idcathegory = '5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,29,30,31,33,34,35';
          } else if (shop_type == 2) {
              idcathegory = '6';
          }else if (shop_type == 3) {
              idcathegory = '25';
          }
          else if (shop_type == 7) {
              idcathegory = '7';
          }else if (shop_type == 4) {
              idcathegory = '20';
          }else if (shop_type == 8) {
              idcathegory = '26';
          } else if (shop_type == 9) {
              idcathegory = '26';
          }else if (shop_type == 10) {
              idcathegory = '31,33,34';
          }else if (shop_type == 11) {
              idcathegory = '10';
          }else if (shop_type == 5) {
              idcathegory = '7';
          }else if (shop_type == 6) {
              idcathegory = '7';
          }*/
  
          /**Just product in same shop type of cutomer are inserted. */
           const sql = `insert into product_customer (id_user,id_product,date,price)
          select ` + idUser + ` , pc.id_product, sysdate(),0 from product_customer pc inner join products p on p.id = pc.id_product 
          where pc.id_user = 1`

/** 
 `insert into product_customer (id_user,id_product,date,price)
          select ` + idUser + ` , pc.id_product, sysdate(),0 from product_customer pc inner join products p on p.id = pc.id_product 
          where pc.id_user = 1 and p.id_cathegory in (` + idcathegory + `)`
 */

          console.log(sql)
           await this.usersRepository.query(sql)
        
  
      }
  
      


   


}