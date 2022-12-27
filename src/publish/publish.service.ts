import { IncludePublishDTO } from './dto/include.publish.dto';
import { Injectable, Inject } from '@nestjs/common';
import { ResultDTO } from 'src/result.dto';

import { ResultCompleteDTO } from 'src/result.complete.dto';

import { Repository,EntityRepository,getManager } from 'typeorm';

import Publish from './publish.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class PublishService {
  constructor(
    @Inject('PUBLISH_REPOSITORY')
    private publishRepository: Repository<Publish>,
  ) {}

  async findAll(): Promise<Publish[]> {
    return this.publishRepository.find({ 
      order: {
        id: "ASC"
      }
    });
  }

  

  public async getUserPublish(idUser: string): Promise<undefined[]> {

   //console.log(idUser)
   /*
    if (idProductPublish != '0') {
        filterProduct = ' and pp.id = ' + idProductPublish;
    }*/
    console.log("ID User -->> "+idUser)
    let sql = ''
    if (idUser != '0') {
       sql = " and p.id_user = "  + idUser

    }
    
console.log(sql)

    const productFlyer = await this.publishRepository.query(`
    select ud.company_name as company_name, p.image as image, p.id as id, us.id id_user, p.id as id_publish_sh, t.header_image, t.footer_image, t.complete_image complete_image,p.description description,p.description description_publish, date_format(p.date, '%d/%m/%Y') dates_creation,t.id id_template
        from  publish p inner join template t on p.id_template = t.id 
        inner join users us on us.id = p.id_user
        left join user_detail ud on ud.id_user = us.id
        where p.status = 1 ` + sql + ` order by p.id asc`);

    return productFlyer

}

public async getProductPublish(idPublish) {

  const sql = await this.publishRepository.query(`select pc.id,p.description,pc.id_product,prod.name,pp.product_price price,prod.image_link, pp.id_publish, pp.id as id_product_publish,
  p.id_user as id_user_publish, p.header2, prod.image_width, prod.image_height
  from product_publish pp inner join publish p on p.id = pp.id_publish
inner join product_customer pc on pc.id = pp.id_product_customer
inner join products prod on prod.id = pc.id_product
where  pp.status =  1 and p.id = ` + idPublish + ` order by pp.id desc`)
  return sql

}

public async getProductUser (iduser, idPublish, name) {
  const sql = `
  select p.name,pc.id,pc.price,p.image_link  from product_customer pc inner join products p on p.id = pc.id_product
        where pc.id_user = ` + iduser + `
        and pc.id not in (select pc.id from product_publish pp inner join publish p on p.id = pp.id_publish
        inner join product_customer pc on pc.id = pp.id_product_customer
        inner join products prod on prod.id = pc.id_product
        where pp.status = 1 and p.id = `+ idPublish +`) and p.status = 1 and upper(p.name) like '%` + name + `%' order by p.name
  `
  console.log(sql)
  const ret =  await this.publishRepository.query(sql)

  return ret
}

public async getTemplate (idUser) {
console.log('getTemplate')
  let sql = `select * from template where status = 1 and (id_user = ` + idUser + ` or id_user = 1) order by order_template asc`

  const ret = await this.publishRepository.query(sql)

  return ret

}


async includePublish (data: IncludePublishDTO): Promise<ResultDTO> {
  let publish = new Publish()
  publish.description = "Template 1"
  publish.id_user = data.id_user
  publish.id_template = data.id_template
  
  console.log("Call Service")
  console.log(publish)
  return this.publishRepository.save(publish).then((result) => {
      return <ResultCompleteDTO> {
          status:true,
          message: "User included with success!!",
          id: result.id
      }
  }).catch((error) => {
      return <ResultCompleteDTO> {
          status:false,
          message: "Error",
          id: ''
      }
  })



}



}