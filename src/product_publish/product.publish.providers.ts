import { DataSource } from 'typeorm';
import ProductPublish from './product.publish.entity';

export const productPublishProviders = [
  {
    provide: 'PRODUCT_PUBLISH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductPublish),
    inject: ['DATA_SOURCE'],
  },
];