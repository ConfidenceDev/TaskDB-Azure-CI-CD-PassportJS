const { sequelize, User } = require("../model/User");

/*
  Function to store to the database 
*/
async function store(obj) {
  return new Promise((resolve, reject) => {
    User.create(obj)
      .then((user) => {
        console.log("User created:", user.toJSON());
        resolve(user.toJSON());
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        reject(err);
      });
  });
}

/*
  Function to fetch the user from the database 
*/
async function findUser(id) {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: {
        id: id,
      },
    })
      .then((user) => {
        console.log("User found: ", user);
        resolve(user);
      })
      .catch((err) => {
        console.error("Error retrieving users:", err);
        reject(err);
      });
  });
}

/*
  Function to fetch all users from the database 
*/
async function allUsers(provider) {
  return new Promise((resolve, reject) => {
    User.findAll({
      where: {
        provider: provider,
      },
    })
      .then((users) => {
        console.log("Users:", users);
        resolve(users);
      })
      .catch((err) => {
        console.error("Error retrieving users:", err);
        reject(err);
      });
  });
}

/*
  Function to count the size of users from the database 
*/
async function allSize(provider) {
  return new Promise((resolve, reject) => {
    User.count({
      where: {
        provider: provider,
      },
    })
      .then((count) => {
        console.log("Count:", count);
        resolve(count);
      })
      .catch((err) => {
        console.error("Error retrieving count:", err);
        reject(err);
      });
  });
}

/*
  Function to evaluate average from the database 
*/
async function avgFollowers(provider) {
  return new Promise((resolve, reject) => {
    const col = "followers";
    const toCal = "avg";
    User.findAll({
      where: {
        provider: provider,
      },
      attributes: [[sequelize.fn("AVG", sequelize.col(col)), toCal]],
    })
      .then((result) => {
        const avgs = result[0].get(toCal).toString();
        console.log(parseInt(avgs));
        resolve(parseInt(avgs));
      })
      .catch((err) => {
        console.error("Error calculating average:", err);
        reject(err);
      });
  });
}

/*
  Function to retrieve the common location from the database 
*/
async function commonLocation(provider) {
  return new Promise((resolve, reject) => {
    const col = "location";
    const colTag = "colTag";
    const matchTag = "locationCount";
    User.findAll({
      where: {
        provider: provider,
      },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col(col)), matchTag],
        [sequelize.col(col), colTag],
      ],
      group: [col],
      order: [[sequelize.literal(col), "DESC"]],
    })
      .then((result) => {
        const ans = result[0].get(colTag);
        console.log("Most Common Location:", ans);
        resolve(ans);
      })
      .catch((err) => {
        console.error("Error retrieving most common location:", err);
        reject(err);
      });
  });
}

module.exports = {
  store,
  findUser,
  allUsers,
  allSize,
  avgFollowers,
  commonLocation,
};
