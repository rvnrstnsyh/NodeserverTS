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

export default class InternalServerError {
  //
  public message
  public data
  public code

  constructor(param: string | any = 'Internal Server Error') {
    //
    this.message = param.message || param
    this.data = param.data
    this.code = param.code
  }
}
