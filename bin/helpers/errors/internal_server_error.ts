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
