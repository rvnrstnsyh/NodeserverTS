/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2021 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import fs from 'fs';
import PATH from 'path';
import base64 from '@root/helpers/utils/base64';

const baseURL = PATH.resolve(__dirname + '../../../../../bin/client/assets')

function base64Encoding(fileName: string): string {
  //
  return base64.encode(fileName, 'png')
}

function raw(fileName: string): string {
  //
  return fs.readFileSync(baseURL + fileName, 'utf8');
}

const items: object = {
  faviconIco: base64Encoding('/img/vscode+icons+type+typescript-1324451507894042344.png'),
  indexCSS: raw('/css/index.css'),
  indexJS: raw('/js/index.js')
};

export default items;
