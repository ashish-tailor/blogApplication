import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let authUser;
      if (isSignup) {
        authUser = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        authUser = await signInWithEmailAndPassword(auth, email, password);
        dispatch(
          setUser({ uid: authUser.user.uid, email: authUser.user.email })
        );
        navigate("/blog");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>
      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Log in"
          : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default Auth;
