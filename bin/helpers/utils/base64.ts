/*
|-------------------------------------------------------------------------------
| Nodeserver Copyright © 2021 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import fs from 'fs'
import PATH from 'path'

export default class Base64 {
  /**
   *  !-- Convert file (Function)
   *  file to base64
   *
   * @return base64
   */
  static encode(path: string, format: string): string {
    //
    const baseURL: string = PATH.resolve(__dirname + '../../../../../bin/client/assets')
    const string: string = fs.readFileSync(baseURL + path, 'base64')
    const formatImg: string = 'data:image/gif;base64,'
    const formatSvg: string = 'data:image/svg+xml;base64,'

    let base64: string
    switch (format) {
      //
      case 'svg':
        base64 = formatSvg + string
        break
      default:
        base64 = formatImg + string
        break
    }

    return base64
  }
}
