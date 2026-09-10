import api from "../../../lib/axios";

const getCurrentUser = async () => {
  const response = await api.get(
    "/auth/me"
  );

  console.log(
    "Current user response:",
    response.data
  );

  return response.data.data.user;
};

export {
  getCurrentUser,
};