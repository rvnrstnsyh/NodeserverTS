import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    //
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['dev', 'prod'] }),
        PORT: port({ default: 3000 }),
        MONGODB_URI: str(),
    });
}

export default validateEnv;
