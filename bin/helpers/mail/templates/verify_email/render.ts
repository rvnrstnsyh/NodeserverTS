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

const handlebars = require('handlebars')
const fs = require('fs')

const verifyRegister = async (options: any): Promise<object> => {
  //
  const html = fs.readFileSync('bin/helpers/mail/templates/verify_email/verify_email.hbs', 'utf8').toString()
  const template = handlebars.compile(html)
  const url = `http://localhost:3000/api/v1/user/verify/${options.token}`
  return template({ url })
}

export default verifyRegister
