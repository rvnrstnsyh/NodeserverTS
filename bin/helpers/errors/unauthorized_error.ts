export default class UnauthorizedError {
  //
  public message
  public data
  public code

  constructor(param: string | any = 'Unauthorized') {
    //
    this.message = param.message || param
    this.data = param.data
    this.code = param.code
  }
}
