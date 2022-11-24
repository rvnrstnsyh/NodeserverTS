import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['dev', 'prod'] }),
        PORT: port({ default: 3000 }),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
    });
}

export default validateEnv;
