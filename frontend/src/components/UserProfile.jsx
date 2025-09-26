import { useNavigate } from "react-router-dom";

export default function UserProfile({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <p className="text-center text-danger">User not logged in.</p>;
  }

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <h3 className="text-success mb-3">👤 User Profile</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button className="btn btn-danger mt-4" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>
    </div>
  );
}
