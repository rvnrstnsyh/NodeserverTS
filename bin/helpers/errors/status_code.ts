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

const ERROR: object | any = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  CONFLICT: 409,
  EXPECTATION_FAILED: 417,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

const SUCCESS: object | any = {
  OK: 200,
  CREATED: 201
}

export { ERROR, SUCCESS }
