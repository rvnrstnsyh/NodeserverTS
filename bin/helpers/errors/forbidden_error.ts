export default class ForbiddenError {
  //
  public message
  public data
  public code

  constructor(param: string | any = 'Forbidden') {
    //
    this.message = param.message || param
    this.data = param.data
    this.code = param.code
  }
}
