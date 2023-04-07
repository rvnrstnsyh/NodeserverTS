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

import * as config from '@helpers/infra/configs/global.config'
import * as wrapper from '@helpers/utils/wrapper'

import UserModel from '@controllers/api/user/user.model'

import fs from 'fs'
import jwt from 'jsonwebtoken'

import { ERROR } from '@helpers/errors/status_code'
import { tokenIFC } from '@helpers/interfaces/token.interface'
import { UnauthorizedError, ForbiddenError } from '@helpers/errors'
import { getKeyIFC, generateTokenIFC, getTokenIFC, decodedTokenIFC, verifyTokenIFC } from '@helpers/interfaces/jwtToken.interface'

const bearerAuthKey: object | any = config.get('/bearerAuthKey')

const getKey: getKeyIFC = (keyPath) => fs.readFileSync(keyPath, 'utf8')

const generateToken: generateTokenIFC = async (payload, expiresIn = '100m') => {
  //
  const privateKey: string = getKey(bearerAuthKey.privateKey)
  const verifyOptions: object = {
    ...bearerAuthKey.verifyOptions,
    expiresIn
  }
  const token: string = jwt.sign(payload, privateKey, verifyOptions)
  return token
}

const getToken: getTokenIFC = (headers) => {
  //
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    //
    const parted: string = headers.authorization.split(' ')
    if (parted.length === 2) {
      //
      return parted[1]
    }
  }
  return undefined
}

const decodeToken: decodedTokenIFC = (token) => {
  //
  const publicKey: string = getKey(bearerAuthKey.publicKey)
  try {
    //
    const decoded: tokenIFC | any = jwt.verify(token, publicKey, bearerAuthKey.verifyOptions)
    return decoded
  } catch (error) {
    //
    if (error instanceof jwt.TokenExpiredError) {
      //
      return new Error('token expired')
    }
    return new Error('invalid token')
  }
}

const verifyToken: verifyTokenIFC = (request, response, next) => {
  //
  const token: string | undefined = getToken(request.headers)
  if (!token) {
    //
    return wrapper.response(response, 'fail', wrapper.error(new UnauthorizedError('Token not found')), 'Verify Token', ERROR.UNAUTHORIZED)
  }
  const decodedToken: object = decodeToken(token)
  if (decodedToken instanceof Error) {
    //
    if (decodedToken.message === 'token expired') {
      //
      return wrapper.response(response, 'fail', wrapper.error(new UnauthorizedError('token expired')), 'Verify Token', ERROR.UNAUTHORIZED)
    }
    return wrapper.response(response, 'fail', wrapper.error(new ForbiddenError('invalid token')), 'Verify Token', ERROR.FORBIDDEN)
  }
  const { userId, authType }: any = decodedToken
  if (authType !== 'access') {
    //
    return wrapper.response(response, 'fail', wrapper.error(new ForbiddenError('invalid token')), 'Verify Token', ERROR.FORBIDDEN)
  }
  (async (): Promise<void> => {
    //
    const user: any | null = await UserModel.findOne({ userId })
    if (user.err) {
      //
      return wrapper.response(response, 'fail', wrapper.error(new ForbiddenError('forbiden access')), 'Verify Token', ERROR.FORBIDDEN)
    }
    request.user = { ...user.data }
    next()
  })()
}

export { generateToken, verifyToken, decodeToken }
