import { IncludeProductPublishDTO } from './dto/include.product.publish.dto';
import { Injectable, Inject } from '@nestjs/common';
import { ResultDTO } from 'src/result.dto';
import { Repository,EntityRepository,getManager } from 'typeorm';

import ProductPublish from './product.publish.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class ProductPublishService {
  constructor(
    @Inject('PRODUCT_PUBLISH_REPOSITORY')
    private productPublishRepository: Repository<ProductPublish>,
  ) {}

async addProductPublish (data: IncludeProductPublishDTO): Promise<ResultDTO> {
 console.log("SERVICE")
  let productPublish = new ProductPublish()
  
  productPublish.id_product_customer = data.id_product_customer
  productPublish.id_publish = data.id_publish
  productPublish.product_price = 0
  console.log(productPublish)
  return this.productPublishRepository.save(productPublish).then((result) => {
      return <ResultDTO> {
          status:true,
          message: "Product included with success!!"
      }
  }).catch((error) => {

    console.log(error)
      return <ResultDTO> {
          status:false,
          message: "Error"
      }

      
  })



}


}