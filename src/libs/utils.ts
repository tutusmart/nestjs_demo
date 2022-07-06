/*
 * @Author: tuWei
 * @Date: 2022-07-06 12:44:56
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-06 19:27:59
 */
import { Logger } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

export const Log = (params = {}) => {
  const req = params['req'];
  const user = params['user'];

  const logger = new Logger();

  const decoded = user ? user : jwt_decode(req.headers.authorization);
  const usernameStr = user ? 'username' : 'username';
  const userIdStr = user ? 'id' : 'userId';

  const username = decoded[usernameStr];
  const userId = decoded[userIdStr];

  const name = `${req.method}:${req.url}`;
  console.log('LogLogLogLogLogLog-------', name);

  logger.warn(`${username}/${userId}`, name);
  logger.warn(req.headers['user-agent'], name);
  logger.warn(
    req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress,
    name,
  );
};
