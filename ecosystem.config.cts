/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2023 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

module.exports = {
    apps: [
        {
            name: '[NODE:3000] NodeserverTS',
            script: './src/index.js',
            interpreter: 'yarn',
            interpreterArgs: 'prod',
        }
    ]
}
