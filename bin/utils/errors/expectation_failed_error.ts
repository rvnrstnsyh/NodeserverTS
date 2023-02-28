export default class ExpectationFailedError {
  //
  public message
  public data
  public code

  constructor(param: string | any = 'Expectation Failed') {
    //
    this.message = param.message || param
    this.data = param.data
    this.code = param.code
  }
}
