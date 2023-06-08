const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = require("../configs/config");
const Sequelize = require("sequelize");
const PG_PORT = 5432;

/*
  Initialize sequelize with database name, database username, database password,
    database host (Eg: localhost), database port (Eg: 5432 for postgresql), and 
    database dialect (E.g: potgres, mysql etc)
*/
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: PG_PORT,
  dialect: DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Skip validation of SSL certificate
    },
  },
  logging: true,
});

// User Schema
const User = sequelize.define("User", {
  id: {
    type: Sequelize.TEXT,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  photo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  provider: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  followers: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  following: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = {
  sequelize,
  User,
};
