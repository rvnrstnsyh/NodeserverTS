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

import * as wrapper from '@/utils/wrapper'

import { ConflictError } from '@/utils/errors'

const isValidPayload: Function = (payload: any, constraint: any) => {
  //
  const message: object | any = {}
  if (!payload) {
    //
    return wrapper.error(new Error('payload is empty'))
  }

  const options: object = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  }
  const { value, error }: object | any = constraint.validate(payload, options)

  if (error) {
    //
    error.details.forEach((detail: any): void => {
      message[`${detail.path}`] = detail.message
    })
    return wrapper.error(new ConflictError(message))
  }
  return wrapper.data(value)
}

export { isValidPayload }
