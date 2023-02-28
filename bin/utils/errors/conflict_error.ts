export default class ConflictError {
  //
  public message
  public data
  public code

  constructor(param: string | any = 'Conflict') {
    //
    this.message = param.message || param
    this.data = param.data
    this.code = param.code
  }
}
