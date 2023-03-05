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

import fs from 'fs'
import handlebars from 'handlebars'

const verifyEmailMailTemplate: any = async (options: object): Promise<object | any> => {
  //
  const hbs: string = fs.readFileSync('bin/helpers/mail/templates/verify_email.hbs', 'utf8').toString()
  const template: any = handlebars.compile(hbs)
  return template(options)
}

export { verifyEmailMailTemplate }
