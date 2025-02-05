import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "./redux/authSlice";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar";
import Auth from "./Screens/Auth";
import Bloglist from "./Screens/Bloglist";
import CreateBlog from "./Screens/CreateBlog";
import BlogEdit from "./Screens/BlogEdit";
import BlogView from "./Screens/BlogView";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(setUser({ uid: authUser.uid, email: authUser.email }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={!user ? <Auth /> : <Navigate to="/blog" />} />
        <Route path="/blog" element={<Bloglist />} />
        <Route
          path="/blog/create"
          element={user ? <CreateBlog /> : <Navigate to="/" />}
        />
        <Route path="/blog/:id" element={<BlogView />} />
        <Route
          path="/blog/edit/:id"
          element={user ? <BlogEdit /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
