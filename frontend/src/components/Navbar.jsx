import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={user?.role === "worker" ? "/worker" : "/recruiter"} className="navbar-logo">
          <img src="/logo.svg" alt="WorkForce Logo" className="logo-icon" />
          <span>WorkForce</span>
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <div className="navbar-user">
                <span className="user-badge">{user.role.charAt(0).toUpperCase()}</span>
                <div className="user-info">
                  <p className="user-name">{user.name}</p>
                  <p className="user-role">{user.role}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <div className="navbar-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link nav-link-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;