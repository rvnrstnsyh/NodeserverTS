'use strict';
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
/*
|-------------------------------------------------------------------------------
| NodeserverTS Copyright © 2022 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/
try {
  //
  console.log('please wait for your project to be installed..');
  /**
   *  !-- VARIABLES
   *
   * @desc define the required variables
   */
  const child_process_1 = __importDefault(require('child_process'));
  const fs_1 = require('fs');

  const packages = JSON.parse((0, fs_1.readFileSync)('./package.json', 'utf8'));
  const deps = packages.dependencies;
  const depsLength = Object.keys(deps).length;
  const devDeps = packages.devDependencies;
  const devDepsLength = Object.keys(devDeps).length;

  const cerName = 'rs256';
  const sshKeygen = `ssh-keygen -t rsa -b 4096 -m PEM -f ${cerName}private.pem -N ""`;
  const openssl = `openssl rsa -in ${cerName}private.pem -pubout -outform PEM -out ${cerName}private.pem.pub`;
  const rename = `mv ${cerName}private.pem.pub ${cerName}public.pem`;
  const rs256 = `\n\t\t${sshKeygen} && \\\n\t\t${openssl} && \\\n\t\t${rename}`;

  const iteration = [0];
  const flag = { flag: 'a' };
  const tmpFile = './updater.tmp.sh';
  const envFile = './.env';
  const envFileExample = '.env.example';
  /**
   *  !-- FILE CHECKER
   *
   * @desc check the existence of a file
   */
  if ((0, fs_1.existsSync)(tmpFile))(0, fs_1.unlinkSync)(tmpFile);
  if ((0, fs_1.existsSync)(`${cerName}public.pem`))(0, fs_1.unlinkSync)(`${cerName}public.pem`);
  if ((0, fs_1.existsSync)(`${cerName}private.pem`))(0, fs_1.unlinkSync)(`${cerName}private.pem`);
  /**
   *  !-- TEMP FILE
   *
   * @desc create a file containing all package.json dependencies
   */
  (0, fs_1.writeFileSync)(tmpFile, '#!/bin/sh\n\ninstall(){\n\t{\n\t\tnpm install \\\n\t\t\t\t');
  for (const key in deps) {
    //
    (0, fs_1.writeFileSync)(tmpFile, `${key}@latest \\\n\t\t\t\t`, flag);
    if (iteration[0] === depsLength - 1)(0, fs_1.writeFileSync)(tmpFile, `${key}@latest && \\\n\n\t\tnpm install \\\n\t\t\t\t`, flag);
    iteration[0]++;
  }

  iteration[0] = 0;

  for (const key in devDeps) {
    //
    (0, fs_1.writeFileSync)(tmpFile, `${key}@latest --save-dev \\\n\t\t\t\t`, flag);
    if (iteration[0] === devDepsLength - 1)(0, fs_1.writeFileSync)(tmpFile, `${key}@latest --save-dev && \\\n\n\t\t${rs256} && \\\n\t\trm -rf ./updater.tmp.sh\n\t}\n}\n\ninstall\n`, flag);
    iteration[0]++;
  }
  /**
   *  !-- EXECUTE FILE
   *
   * @desc update to the latest version
   */
  child_process_1.default.execSync(`chmod u+x ${tmpFile} && bash ${tmpFile} && npm run build`);
  /**
   *  !-- ENVIRONMENT
   *
   * @desc sync and create new environment contents from .env.example file
   */
  const keygen_1 = __importDefault(require('./dist/bin/helpers/utils/keygen'));
  const uuid_1 = require('uuid');
  (0, fs_1.readFile)(envFileExample, 'utf8', (error, data) => {
    //
    const env = {};
    const lines = data.split('\n');
    const alpha = /^[a-zA-Z]+$/;
    const randHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const keypair = keygen_1.default.genKey(32);
    const uuidv4Pass = (0, uuid_1.v4)();
    const basicAuth = `Basic ${Buffer.from(env['BASIC_AUTH_USERNAME'] + ':' + uuidv4Pass).toString('base64')}`;

    for (let i = 0; i < lines.length - 1; i++) {
      //
      if (alpha.test(lines[i].substring(0, 1))) {
        //
        const parts = lines[i].split('=');
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
        env[parts[0].trim()] = [`${i}+line+`].concat(parts[1].split('')).join('');
      }
    }

    const newEnv = {
      APP_SECRET: keypair.privatekey,
      APP_PUBLIC: keypair.publickey.compressed,
      BASIC_AUTH_PASSWORD: uuidv4Pass,
      BASIC_AUTH_HEADER: basicAuth,
      APP_NAMESPACE: (0, uuid_1.v5)(randHex(16), (0, uuid_1.v4)()),
      JWT_SECRET: randHex(32),
      COOKIE_SECRET: randHex(32),
      CIPHER_GCM_KEY: randHex(64),
      CIPHER_CBC_KEY: randHex(32),
    };

    for (const key in newEnv)env[key] = `${env[key].split('+line+')[0]}+line+${newEnv[key]}`;

    if ((0, fs_1.existsSync)(envFile))(0, fs_1.unlinkSync)(envFile);

    for (let i = 0; i < lines.length - 1; i++) {
      //
      if (!alpha.test(lines[i].substring(0, 1)))(0, fs_1.writeFileSync)(envFile, `${lines[i]}\n`, flag);
      for (const key in env) {
        //
        if (parseInt(env[key].split('+line+')[0]) === i)(0, fs_1.writeFileSync)(envFile, `${key}=${env[key].split('+line+')[1]}\n`, flag);
      }
    }
  });
} catch (error) {
  //
  console.log(error.message);
}
