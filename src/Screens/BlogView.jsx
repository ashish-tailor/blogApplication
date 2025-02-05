import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "../firebase";
import "./BlogView.css";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(DB, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          setBlog(blogSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="loading">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="error">Blog not found</p>;
  }

  return (
    <div className="blog-container">
      <img src={blog.ImageUrl} alt="Blog Image" width={"100%"} height={500} />
      <h1 className="blog-title">{blog.Title}</h1>
      <p>{blog.Discription}</p>
      <p>Created By: {blog.Email || "Unknown User"}</p>
      <p
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: blog.Body }}
      ></p>
    </div>
  );
};

export default BlogView;
