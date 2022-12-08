import { DataSource } from 'typeorm';
import Publish from './publish.entity';

export const publishProviders = [
  {
    provide: 'PUBLISH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Publish),
    inject: ['DATA_SOURCE'],
  },
];