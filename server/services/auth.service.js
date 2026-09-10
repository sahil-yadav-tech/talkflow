import bcrypt from "bcryptjs";

import {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserById,
} from "../repositories/user.repository.js";

import generateToken from "../utils/generateToken.js";
import AppError from "../utils/appError.js";

const registerUser = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user);

  user.password = undefined;

  return {
    user,
    token,
  };
};

const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};

const getAllUsers = async (currentUserId) => {
  const users = await findAllUsers(currentUserId);

  return users;
};


export {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers
};