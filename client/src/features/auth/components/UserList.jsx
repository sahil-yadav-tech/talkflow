import useUsers from "../hooks/useUsers";

const UserList = ({ onSelectUser }) => {
  const {
    users,
    loading,
    error,
  } = useUsers();

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!users.length) {
    return <p>No users found.</p>;
  }

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <button
          key={user._id}
          onClick={() => onSelectUser(user)}
        >
          <div>
            <strong>{user.name}</strong>
          </div>

          <div>
            <small>{user.email}</small>
          </div>
        </button>
      ))}
    </div>
  );
};

export default UserList;