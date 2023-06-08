/*const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = require("../configs/config");*/
const Sequelize = require("sequelize");

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.dbname,
  process.env.dbusername,
  process.env.dbpassword,
  {
    host: process.env.dbhost,
    dialect: process.env.dbdialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Skip validation of SSL certificate
      },
    },
    logging: true,
  }
);

// Define a model
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
