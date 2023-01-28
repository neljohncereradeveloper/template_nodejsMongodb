module.exports = {
  apps: [
    {
      name: "mongodb-server-api",
      script: "build/index.js",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
