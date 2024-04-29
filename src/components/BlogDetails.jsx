// BlogDetails.jsx
import React from "react";

const BlogDetails = ({ blog, onUpdate, onDelete }) => {
  return (
    <div className="blog-card">
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-content">{blog.content}</p>
      <button className="edit-button" onClick={onUpdate}>Edit</button>
      <button className="delete-button" onClick={onDelete}>Delete</button>
    </div>
  );
};

export default BlogDetails;
