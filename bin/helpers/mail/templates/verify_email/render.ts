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

const verifyRegister = async (options: any): Promise<object> => {
  //
  const html: string = fs.readFileSync('bin/helpers/mail/templates/verify_email/verify_email.hbs', 'utf8').toString()
  const template: any = handlebars.compile(html)
  const url: string = `http://localhost:3000/api/v1/user/verify/${options.token}`
  return template({ url })
}

export default verifyRegister
