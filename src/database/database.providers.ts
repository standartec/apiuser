import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'onecart.mysql.dbaas.com.br',
        port: 3306,
        username: 'onecart',
        password: 'Fr48915199',
        //database: 'onecart',
       // host: 'localhost',
       // port: 8889,
       // username: 'root',
      //  password: 'root',
        database: 'onecart',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

localhost:8889