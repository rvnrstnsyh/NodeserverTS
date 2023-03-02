export default class ServiceUnavailableError {
  //
  public message
  public data
  public code

  constructor(param: string | any = 'Service Unavailable') {
    //
    this.message = param.message || param
    this.data = param.data
    this.code = param.code
  }
}
