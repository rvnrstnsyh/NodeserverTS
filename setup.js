'use strict';
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
/*
|-------------------------------------------------------------------------------
| NodeserverTS-installer Copyright © 2023 rvnrstnsyh All Rights Reserved
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@rvnrstnsyh.dev> (https://rvnrstnsyh.dev)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/
// eslint-disable-next-line
console.log('please wait for your project to be installed..');
/**
 *  !-- VARIABLES
 *
 * @desc define the required variables
 */
const child_process_1 = __importDefault(require('child_process'));
const fs_1 = require('fs');
const packages = JSON.parse((0, fs_1.readFileSync)('./package.json', 'utf8'));
const managers = ['npm', 'yarn'];
const deps = packages.dependencies;
const depsLength = Object.keys(deps).length;
const devDeps = packages.devDependencies;
const devDepsLength = Object.keys(devDeps).length;
const excludeDeps = ['ipfs-http-client', 'and-whatever'];
const cerName = '_';
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
if ((0, fs_1.existsSync)(tmpFile)) (0, fs_1.unlinkSync)(tmpFile);
if ((0, fs_1.existsSync)(`${cerName}public.pem`)) (0, fs_1.unlinkSync)(`${cerName}public.pem`);
if ((0, fs_1.existsSync)(`${cerName}private.pem`)) (0, fs_1.unlinkSync)(`${cerName}private.pem`);
/**
 *  !-- TEMP FILE
 *
 * @desc create a file containing all package.json dependencies
 */
(0, fs_1.writeFileSync)(tmpFile, '#!/bin/sh\n\n');
for (let i = 0; i < managers.length; i++) {
  //
  managers[i] === 'npm'
    ? (0, fs_1.writeFileSync)(tmpFile, `${managers[i]}Install(){\n\t{\n\t\tnpm install \\\n\t\t\t\t`, flag)
    : (0, fs_1.writeFileSync)(tmpFile, `${managers[i]}Install(){\n\t{\n\t\tyarn add \\\n\t\t\t\t`, flag);
  /**
   *  !-- DEPENDENCIES
   *
   * @desc ALL dependencies
   */
  for (const key in deps) {
    //
    if (excludeDeps.includes(key)) {
      // ? prevent updating to the latest version
      iteration[0] !== depsLength - 1
        ? (0, fs_1.writeFileSync)(tmpFile, `${key}@${deps[key]} \\\n\t\t\t\t`, flag)
        : (0, fs_1.writeFileSync)(tmpFile, `${key}@${deps[key]} && \\\n\n\t\t${managers[i]} ${managers[i] === 'npm' ? 'install' : 'add'} \\\n\t\t\t\t`, flag);
    }
    else {
      // ? update to the latest version
      iteration[0] !== depsLength - 1
        ? (0, fs_1.writeFileSync)(tmpFile, `${key}@latest \\\n\t\t\t\t`, flag)
        : (0, fs_1.writeFileSync)(tmpFile, `${key}@latest && \\\n\n\t\t${managers[i]} ${managers[i] === 'npm' ? 'install' : 'add'} \\\n\t\t\t\t`, flag);
    }
    iteration[0]++;
  }
  iteration[0] = 0; // ? reset iteration for dev dependencies
  /**
   *  !-- DEV DEPENDENCIES
   *
   * @desc ALL DEV dependencies
   */
  for (const key in devDeps) {
    //
    if (excludeDeps.includes(key)) {
      // ? prevent updating to the latest version
      iteration[0] !== devDepsLength - 1
        ? (0, fs_1.writeFileSync)(tmpFile, `${key}@${devDeps[key]} ${managers[i] === 'npm' ? '--save-dev' : '--dev'} \\\n\t\t\t\t`, flag)
        : (0, fs_1.writeFileSync)(tmpFile, `${key}@${devDeps[key]} ${managers[i] === 'npm' ? '--save-dev' : '--dev'} && \\\n\n\t\t${rs256} && \\\n\t\trm -rf ./updater.tmp.sh\n\t}\n}\n\n`, flag);
    }
    else {
      // ? update to the latest version
      iteration[0] !== devDepsLength - 1
        ? (0, fs_1.writeFileSync)(tmpFile, `${key}@latest ${managers[i] === 'npm' ? '--save-dev' : '--dev'} \\\n\t\t\t\t`, flag)
        : (0, fs_1.writeFileSync)(tmpFile, `${key}@latest ${managers[i] === 'npm' ? '--save-dev' : '--dev'} && \\\n\n\t\t${rs256} && \\\n\t\trm -rf ./updater.tmp.sh\n\t}\n}\n\n`, flag);
    }
    iteration[0]++;
  }
  iteration[0] = 0;
}
(0, fs_1.writeFileSync)(tmpFile, `${managers[0]}Install || ${managers[1]}Install\n`, flag);
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
  const keypair = keygen_1.default.genKey(32);
  const uuidv4Pass = (0, uuid_1.v4)();
  const basicAuth = `Basic ${Buffer.from(env['BASIC_AUTH_USERNAME'] + ':' + uuidv4Pass).toString('base64')}`;
  const randHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  for (let i = 0; i < lines.length - 1; i++) {
    //
    if (alpha.test(lines[i].substring(0, 1))) {
      //
      const parts = lines[i].split('=');
      env[parts[0].trim()] = parts.slice(1).join('=').trim();
      env[parts[0].trim()] = [`${i}+line+`].concat(parts[1].split('')).join('');
    }
  }

  const overrideEnv = {
    // ------------------------------------------------------------------
    // General
    // ------------------------------------------------------------------
    APP_SECRET: keypair.privatekey,
    APP_PUBLIC: keypair.publickey.compressed,
    APP_NAMESPACE: (0, uuid_1.v5)(randHex(16), (0, uuid_1.v4)()),
    // ------------------------------------------------------------------
    // Cookie
    // ------------------------------------------------------------------
    COOKIE_SECRET: randHex(32),
    // ------------------------------------------------------------------
    // Authentication
    // ------------------------------------------------------------------
    BASIC_AUTH_PASSWORD: uuidv4Pass,
    BASIC_AUTH_HEADER: basicAuth,
    JWT_SECRET: randHex(32),
    PRIVATE_KEY_PATH: `./${cerName}private.pem`,
    PUBLIC_KEY_PATH: `./${cerName}public.pem`,
    // ------------------------------------------------------------------
    // Cipher
    // ------------------------------------------------------------------
    CIPHER_GCM_KEY: randHex(64),
    CIPHER_CBC_KEY: randHex(32),
    // ------------------------------------------------------------------
    // InterPlanetary File System
    // ------------------------------------------------------------------
    IPFS_HOST: '127.0.0.1',
    IPFS_PORT: 5001,
    IPFS_PROTOCOL: 'http',
    IPFS_API_PATH: '/api/v0',
    IPFS_TIMEOUT: '1m'
  };

  for (const key in overrideEnv) env[key] = `${env[key].split('+line+')[0]}+line+${overrideEnv[key]}`;
  if ((0, fs_1.existsSync)(envFile)) (0, fs_1.unlinkSync)(envFile);
  for (let i = 0; i < lines.length - 1; i++) {
    //
    if (!alpha.test(lines[i].substring(0, 1))) (0, fs_1.writeFileSync)(envFile, `${lines[i]}\n`, flag);
    for (const key in env) if (parseInt(env[key].split('+line+')[0]) === i) (0, fs_1.writeFileSync)(envFile, `${key}=${env[key].split('+line+')[1]}\n`, flag);
  }
});
