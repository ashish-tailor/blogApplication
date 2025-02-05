import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { DB } from "../firebase";
import ReactQuill from "react-quill";

const BlogEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(DB, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          const data = blogSnap.data();
          setTitle(data.Title);
          setDiscription(data.Discription);
          setImageUrl(data.ImageUrl);
          setBody(data.Body);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation: Check if all fields are filled
    if (
      !title.trim() ||
      !discription.trim() ||
      !body.trim() ||
      !imageURL.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const blogRef = doc(DB, "blogs", id);
      await updateDoc(blogRef, {
        Title: title,
        Discription: discription,
        Body: body,
        ImageUrl: imageURL,
        publishedOn: Timestamp.fromDate(new Date()),
      });

      alert("Data Successfully Updated");
      navigate("/");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (loading) {
    return <p>Loading blog...</p>;
  }

  return (
    <div className="container">
      <h1>Edit</h1>
      <form onSubmit={handleSubmit} className="createForm">
        <input
          className="titleInput"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="titleInput"
          type="text"
          placeholder="Description About Blog..."
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
          required
        />
        <input
          className="titleInput"
          type="text"
          placeholder="https//:ImageUrl..."
          value={imageURL}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          className="Editor"
        />

        <button type="submit" className="SubmitBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogEdit;
