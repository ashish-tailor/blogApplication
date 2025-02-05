import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { DB, auth } from "../firebase";
import { Link } from "react-router-dom";
import "./Bloglist.css";

const Bloglist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [localBlogs, setLocalBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const dispatch = useDispatch();

  // Redux State
  const blogs = useSelector((state) => state.blogs.blogs);
  const loading = useSelector((state) => state.blogs.loading);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    setLocalBlogs(blogs);
  }, [blogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const filteredBlogs = localBlogs
    .filter((blog) =>
      blog.Title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Sorting by date (newest first)
      return b.publishedOn.seconds - a.publishedOn.seconds;
    });

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteDoc(doc(DB, "blogs", id));
      setLocalBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      alert("Blog deleted successfully!");
      dispatch(fetchBlogs());

    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Function to format the Firebase timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); 
    return date.toLocaleString(); 
  };

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="blogListContainer">
      <h2>All Blogs List</h2>
      <form className="SearchInput" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Blog..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="blog-list">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => {
              const user = auth.currentUser;
              const isAuthor = user && user.email === blog.Email;
              return (
                <div key={blog.id} className="blog-card">
                  <img src={blog.ImageUrl} alt="Blog Image" className="listBlogImage"/>
                  <h1>{blog.Title}</h1>
                  <p>{blog.Discription}</p>
                  <p>Created By: {blog.Email || "Unknown User"}</p>
                  <p>Published On: {formatDate(blog.publishedOn)}</p>
                  <div className="actions">
                    <Link to={`/blog/${blog.id}`} className="view">View</Link>
                    {isAuthor && (
                      <>
                        <Link to={`/blog/edit/${blog.id}`} className="edit">Edit</Link>
                        <button className="delete" onClick={() => deleteBlog(blog.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Bloglist;
