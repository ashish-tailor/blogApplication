import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { DB, auth } from "../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const navigate = useNavigate();

  const submitBlog = async (e) => {
    e.preventDefault();

    // Validation: Check if all fields are filled
    if (
      !title.trim() ||
      !description.trim() ||
      !body.trim() ||
      !imageURL.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(DB, "blogs"), {
          Title: title,
          Discription: description,
          Body: body,
          ImageUrl: imageURL,
          publishedOn: Timestamp.fromDate(new Date()),
          Email: user.email,
          userId: user.uid,
        });

        alert("Blog Successfully Submitted!");
        setTitle("");
        setDescription("");
        setBody("");
        setImageUrl("");
        navigate("/");
      } else {
        alert("You must be logged in to create a blog.");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Create Blog</h1>
      <form onSubmit={submitBlog} className="createForm">
        <input
          className="titleInput"
          type="text"
          placeholder="Blog Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="titleInput"
          type="text"
          placeholder="Description About Blog..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="titleInput"
          type="text"
          placeholder="https://ImageUrl..."
          value={imageURL}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          className="Editor"
          placeholder="Please write something about your blog..."
        />
        <button type="submit" className="SubmitBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
