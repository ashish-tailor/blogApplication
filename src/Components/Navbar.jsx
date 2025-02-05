import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Navbar.css";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="navbar">
      <h1 className="logo">My Blog</h1>
      <div className="nav-links">
        <Link to="/blog" className="nav-item">
          Home
        </Link>
        <Link to="/blog/create" className="nav-item">
          Create Blog
        </Link>
        {!user ? (
          <Link to="/" className="nav-item signup-btn">
            Login
          </Link>
        ) : (
          <button onClick={() => auth.signOut()} className="nav-item logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
