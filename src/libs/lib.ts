/*
 * @Author: tuWei
 * @Date: 2022-07-06 12:44:56
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-06 18:20:55
 */
import * as CryptoJS from 'crypto-js';
import { cryptoConstants } from './crypto';

export const cryptoString = (str) => {
  return CryptoJS.HmacSHA1(str, cryptoConstants.privateKey).toString();
};

export const jwtConstants = {
  secret: 'jwtPrivateKey',
  adminSecret: 'admin.giibee.com',
};
