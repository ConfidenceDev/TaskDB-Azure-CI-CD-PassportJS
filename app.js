require("dotenv/config");
const { PORT, SESSION_SECRET, DB_PASSWORD } = require("./configs/config");
const cors = require("./cors/cors");
const { sequelize, User } = require("./model/User");
const session = require("express-session");
const user_route = require("./routes/user_route");
const express = require("express");
const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("Welcome to TaskDB dashboard: " + DB_PASSWORD);
  return res.status(200).json({
    message: "Welcome to TaskDB dashboard, see README.md file to use API",
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    //return sequelize.sync({ force: true }); //Force DB to drop and recreate table
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

User.sync()
  .then(() => console.log("User table created"))
  .catch((err) => console.error("Error creating User table:", err));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000, // 30 secs
    },
  })
);
app.use(user_route);

app.listen(PORT, () => {
  console.log(`${DB_PASSWORD} Server running on port: ${PORT}`);
});
