// CreateBlogForm.jsx
import React, { useState } from "react";

const CreateBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default CreateBlogForm;

