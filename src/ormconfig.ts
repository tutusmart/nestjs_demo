/*
 * @Author: tuWei
 * @Date: 2022-07-08 23:39:05
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 23:42:17
 */
import { DataSource } from 'typeorm';

const dbInfo = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
};
const { host, port, username, password } = dbInfo;

const ormconfig = async (): Promise<DataSource> => {
  return new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database: 'node_nest_api',
    // entities: [],
    // autoLoadEntities: true,
    synchronize: true,
  });
};

// eslint-disable-next-line import/no-default-export
export default ormconfig();
