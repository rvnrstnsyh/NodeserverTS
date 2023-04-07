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

/**
 * @fileoverview Provides easy encryption/decryption methods using AES 256 GCM.
 */

import * as logger from '@helpers/utils/logger'
import * as config from '@helpers/infra/configs/global.config'

import crypto from 'crypto'

const ivConfig: object | any = config.get('/cipher')

/**
 * Provides easy encryption/decryption methods using AES 256 GCM.
 */
class Aes256 {
  /**
   * No need to run the constructor. The class only has static methods.
   */

  /**
   * Encrypts text with AES 256 GCM or CBC.
   * @param {string} message - Cleartext to encode.
   * @param {string} algorithm - 'aes-256-gcm' OR 'aes-256-cbc' default GCM.
   * @param {string} key - Sharedkey or key.
   * @returns {string}
   */
  static encrypt(message: string, algorithm = `${ivConfig.algorithm}`, key = `${ivConfig.gcm_key}`): string {
    //
    const ciphertext: Array<string | any> = []
    switch (algorithm.toLowerCase()) {
      //
      case 'aes-256-gcm':
        try {
          //
          const iv: Buffer = crypto.randomBytes(ivConfig.ivLength)
          const cipher: string | any = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv)

          ciphertext[0] = cipher.update(message, 'utf8', 'hex')
          ciphertext[0] += cipher.final('hex')
          ciphertext[0] = iv.toString('hex') + ':' + ciphertext[0].toString('hex') + ':' + cipher.getAuthTag().toString('hex')
        } catch (error: any) {
          //
          logger.error('aes256gcm-encrypt', error.message, 'error')
        }
        break
      case 'aes-256-cbc':
        try {
          //
          const iv: Buffer = crypto.randomBytes(ivConfig.ivLength)
          const cipher: string | any = crypto.createCipheriv(algorithm, Buffer.from(ivConfig.cbc_key), iv)

          ciphertext[0] = cipher.update(message)
          ciphertext[0] = Buffer.concat([ciphertext[0], cipher.final()])
          ciphertext[0] = iv.toString('hex') + ':' + ciphertext[0].toString('hex')
        } catch (error: any) {
          logger.error('aes256cbc-encrypt', error.message, 'error')
        }
        break
      default:
        break
    }
    return ciphertext[0]
  }

  /**
   * Decrypts AES 256 CGM or CBC encrypted text.
   * @param {string} payloadHex - Hex-encoded ciphertext.
   * @param {string} algorithm - 'aes-256-gcm' OR 'aes-256-cbc' default GCM.
   * @param {string} key - Sharedkey or key.
   * @returns {string}
   */
  static decrypt(payloadHex: string, algorithm = `${ivConfig.algorithm}`, key = `${ivConfig.gcm_key}`): string {
    //
    const cleartext: Array<string | any> = []
    switch (algorithm.toLowerCase()) {
      //
      case 'aes-256-gcm':
        try {
          //
          const split: Array<string> = payloadHex.split(':')
          const iv: string = split[0]
          const ciphertext: string = split[1]
          const auth: string = split[2]

          const decipher: any = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))

          decipher.setAuthTag(Buffer.from(auth, 'hex'))
          cleartext[0] = decipher.update(ciphertext, 'hex', 'utf8')
          cleartext[0] += decipher.final('utf8')
        } catch (error: any) {
          //
          logger.error('aes256gcm-decrypt', error.message, 'error')
        }
        break
      case 'aes-256-cbc':
        try {
          //
          const parts: Array<any> = payloadHex.split(':')
          const iv: Buffer = Buffer.from(parts.shift(), 'hex')
          const encrypted: Buffer = Buffer.from(parts.join(':'), 'hex')
          const decipher: string | any = crypto.createDecipheriv(algorithm, Buffer.from(ivConfig.cbc_key), iv)
          const decrypted: string = decipher.update(encrypted)
          cleartext[0] = Buffer.concat([decrypted, decipher.final()]).toString()
        } catch (error: any) {
          //
          logger.error('aes256cbc-decrypt', error.message, 'error')
        }
        break
      default:
        break
    }
    return cleartext[0]
  }
}

export default Aes256
