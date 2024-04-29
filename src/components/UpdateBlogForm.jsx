// UpdateBlogForm.jsx
import React, { useState } from "react";

const UpdateBlogForm = ({ initialBlog, onUpdate }) => {
  const [title, setTitle] = useState(initialBlog.title);
  const [content, setContent] = useState(initialBlog.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ title, content });
  };

  return (
    <form  onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit">Update Blog</button>
    </form>
  );
};

export default UpdateBlogForm;
