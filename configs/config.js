/*
  Default configurations for easy access of environment variables
*/

module.exports = {
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.googleclientid,
  GOOGLE_CLIENT_SECRET: process.env.googleclientsecret,
  GITHUB_CLIENT_ID: process.env.githubclientid,
  GITHUB_CLIENT_SECRET: process.env.githubclientsecret,
  SESSION_SECRET: process.env.sessionsecret,
  DB_NAME: process.env.dbname,
  DB_USERNAME: process.env.dbusername,
  DB_PASSWORD: process.env.dbpassword,
  DB_HOST: process.env.dbhost,
  DB_DIALECT: process.env.dbdialect,
};
