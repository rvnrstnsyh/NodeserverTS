module.exports = {
    apps: [
        {
            name: 'nodeserverTS [3000]',
            script: './src/index.js',
            interpreter: 'yarn',
            interpreterArgs: 'prod',
        },
    ],
};
