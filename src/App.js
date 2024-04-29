// App.js
import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
import CreateBlogForm from "./components/CreateBlogForm";
import UpdateBlogForm from "./components/UpdateBlogForm";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import DeleteButton from "./components/DeleteButton";
import "./styles.css"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const GET_BLOGS = gql`
  query {
    blogs {
      id
      title
      content
    }
  }
`;

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    client
      .query({
        query: GET_BLOGS,
      })
      .then((result) => {
        setBlogs(result.data.blogs);
      });
  }, []);

  const handleCreateBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  };

  // const handleUpdateBlog = (updatedBlog) => {
  //   const updatedBlogs = blogs.map((blog) =>
  //     blog.id === updatedBlog.id ? updatedBlog : blog
  //   );
  //   setBlogs(updatedBlogs);
  //   setSelectedBlog(null); // Close update form
  // };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs((prevBlogs) => {
      // Map over the previous blogs array and update the specific blog
      return prevBlogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          // Return the updated blog if it matches the id of the edited blog
          return updatedBlog;
        } else {
          // Otherwise, return the blog as is
          return blog;
        }
      });
    });
    setSelectedBlog(null); // Close update form
  };


  const handleDeleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    setSelectedBlog(null); // Deselect blog
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Blog App</h1>
        <CreateBlogForm onCreate={handleCreateBlog} />
        <hr />
        <BlogList blogs={blogs} onSelect={setSelectedBlog} />
        <hr />
        {selectedBlog && (
          <div>
            <BlogDetails
              blog={selectedBlog}
              onUpdate={() => setSelectedBlog(selectedBlog)}
              onDelete={() => handleDeleteBlog(selectedBlog.id)}
            />
            <hr />
            <UpdateBlogForm
              initialBlog={selectedBlog}
              onUpdate={handleUpdateBlog}
            />
            <hr />
            <DeleteButton onDelete={() => handleDeleteBlog(selectedBlog.id)} />
          </div>
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
