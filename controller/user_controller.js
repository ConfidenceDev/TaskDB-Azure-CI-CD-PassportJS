const {
  store,
  findUser,
  allUsers,
  allSize,
  avgFollowers,
  commonLocation,
} = require("../dao/user_model");
const { v4: uuidv4 } = require("uuid");

async function storeUser(user, res) {
  try {
    const genUUID = uuidv4();

    const obj = {
      id: genUUID,
      userId: user.id,
      name: user.displayName,
      email: user.emails[0].value,
      photo: user.photos[0].value,
      provider: user.provider,
      followers: user._json.followers ? user._json.followers : 0,
      following: user._json.following ? user._json.following : 0,
      location: user._json.location ? user._json.location : null,
    };

    const result = await store(obj);
    if (result) res.status(200).json({ status: "success", message: "saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: "something went wrong" });
  }
}

async function findAUser(id, res) {
  try {
    const result = await findUser(id);

    if (result) res.status(200).json({ status: "success", message: result });
    else res.status(400).json({ status: "failed", message: "user not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: "something went wrong" });
  }
}

async function getAllUsers(provider, res) {
  try {
    const result = await allUsers(provider);

    if (result.length > 0)
      res.status(200).json({ status: "success", message: result });
    else res.status(400).json({ status: "failed", message: "no users yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: "something went wrong" });
  }
}

async function getAllSize(provider, res) {
  try {
    const result = await allSize(provider);

    if (result) res.status(200).json({ status: "success", message: result });
    else res.status(400).json({ status: "failed", message: "no users yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: "something went wrong" });
  }
}

async function getAvgFollowers(provider, res) {
  try {
    const result = await avgFollowers(provider);

    if (result) res.status(200).json({ status: "success", message: result });
    else res.status(400).json({ status: "failed", message: "no users yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: "something went wrong" });
  }
}

async function mostCommonLocation(provider, res) {
  try {
    const result = await commonLocation(provider);

    if (result) res.status(200).json({ status: "success", message: result });
    else res.status(400).json({ status: "failed", message: "no users yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: "something went wrong" });
  }
}

module.exports = {
  storeUser,
  findAUser,
  getAllUsers,
  getAllSize,
  getAvgFollowers,
  mostCommonLocation,
};
