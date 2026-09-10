import { useEffect, useState } from "react";

import { getUsers } from "../services/user.api";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        console.error(
          "Failed to fetch users:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
  };
};

export default useUsers;