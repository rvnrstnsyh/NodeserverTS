export default class GatewayTimeoutError {
  //
  public message
  public data
  public code

  constructor(param: string | any = 'Gateway Timeout') {
    //
    this.message = param.message || param
    this.data = param.data
    this.code = param.code
  }
}
