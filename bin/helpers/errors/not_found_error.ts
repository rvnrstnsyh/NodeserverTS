export default class NotFoundError {
  //
  public message
  public data
  public code

  constructor(param: string | any = 'Not Found') {
    //
    this.message = param.message || param
    this.data = param.data
    this.code = param.code
  }
}
