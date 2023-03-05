/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2022 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import * as config from '@helpers/infra/configs/global.config'

import nodemailer from 'nodemailer'

const mailConfig: object = config.get('/mailer')
const transporter: any = nodemailer.createTransport(mailConfig)

const sendMail: any = async (mailOptions: any): Promise<boolean> => {
  //
  return new Promise((resolve: any, reject: any): void => {
    //
    transporter.sendMail(mailOptions, (error: any, info: object) => {
      //
      if (error) {
        //
        resolve(false)
      } else {
        //
        resolve(true)
      }
    })
  })
}

export { transporter, sendMail }
