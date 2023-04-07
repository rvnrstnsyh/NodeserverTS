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

import * as logger from '@helpers/utils/logger'
import * as config from '@helpers/infra/configs/global.config'

import nodemailer from 'nodemailer'

const mailConfig: object = config.get('/mailer')
const transporter: any = nodemailer.createTransport(mailConfig)

const sendMail: any = async (mailOptions: any): Promise<boolean> => {
  //
  return new Promise((resolve: any, reject: any): void => {
    //
    transporter.sendMail(mailOptions, (error: any, info: string) => {
      //
      if (error) {
        //
        logger.log('sendMail', error, 'error')
        resolve(false)
      } else {
        //
        logger.log('sendMail', info, 'info')
        resolve(true)
      }
    })
  })
}

export { transporter, sendMail }
