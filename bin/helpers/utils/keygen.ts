/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2023 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import * as elliptic from 'elliptic'

import CryptoJS from 'crypto-js'

const secp256k1 = new elliptic.ec('secp256k1')

class ApikeyFactory {
  /**
   *  !-- GENERATE KEY PAIR (Method)
   *
   * @desc generate key pair.
   * @return object
   */
  static genKey(length: number): object {
    //
    const format: string = '0123456789ABCDEF'
    const randKey: Array<string> = ['']

    for (let i: number = length; i > 0; --i) randKey[0] += format[Math.floor(Math.random() * format.length)]

    const apikey: string = randKey[0]
    const privatekey: object | any = CryptoJS.SHA256(apikey).toString()
    const keypair: object | any = secp256k1.keyFromPrivate(privatekey)
    const publickey: object = {
      original: keypair.getPublic('hex'),
      compressed: keypair.getPublic(true, 'hex'),
      x: keypair.getPublic().getX().toString('hex'),
      y: keypair.getPublic().getY().toString('hex')
    }
    return { apikey, privatekey, publickey }
  }
}

export default ApikeyFactory
