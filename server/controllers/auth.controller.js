import {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
} from "../services/auth.service.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const { user, token } = await registerUser({
      name,
      email,
      password,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // true in production HTTPS
      sameSite: "lax",
      path: "/",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({
      email,
      password,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // true in production HTTPS
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.userId);

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};


const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.userId);

    return res.status(200).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await getCurrentUser(userId);

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};


const getUsers = async (req, res, next) => {
  try {
    const currentUserId = req.user.userId;

    const users = await getAllUsers(
      currentUserId
    );

    return res.status(200).json({
      success: true,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  logout,
  me,
  getUsers,
  getMe
};