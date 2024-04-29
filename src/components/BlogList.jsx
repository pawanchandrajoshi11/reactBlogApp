// BlogList.jsx
import React from "react";

const BlogList = ({ blogs, onSelect }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-item" key={blog.id} onClick={() => onSelect(blog)}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
