import api from "../../../lib/axios";

const getUsers = async () => {
  const response = await api.get("/auth/getUsers");
  console.log(response.data.data.users, "response response");
  return response.data.data.users;
};

export {
  getUsers,
};