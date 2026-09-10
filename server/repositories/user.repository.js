import User from "../models/user.model.js";

const createUser = async (userData) => {
  const user = await User.create(userData);

  return user;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });

  return user;
};

const findUserByEmailWithPassword = async (email) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  return user;
};

const findUserById = async (userId) => {
  const user = await User.findById(userId);

  return user;
};

const findAllUsers = async (currentUserId) => {
  return await User.find({
    _id: {
      $ne: currentUserId, // currentUserId DONT GET CORRENT LOOGED IN USER LIST 
    },
  }).select("_id name email role");
};


export {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserById,
  findAllUsers
};