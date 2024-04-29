const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const fs = require("fs");

const app = express();

const blogsData = JSON.parse(fs.readFileSync("./data/blogs.json"));

const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    blogs: [Blog!]!
    getBlog(id: ID!): Blog
  }

  type Mutation {
    createBlog(input: BlogInput!): Blog!
    updateBlog(id: ID!, input: BlogInput!): Blog!
    deleteBlog(id: ID!): Blog!
  }

  input BlogInput {
    title: String!
    content: String!
  }
`;

const resolvers = {
  Query: {
    blogs: () => blogsData,
    getBlog: (_, { id }) => blogsData.find((blog) => blog.id === id),
  },
  Mutation: {
    createBlog: (_, { input }) => {
      const newBlog = { id: Date.now().toString(), ...input };
      blogsData.push(newBlog);
      fs.writeFileSync("./data/blogs.json", JSON.stringify(blogsData));
      return newBlog;
    },
    updateBlog: (_, { id, input }) => {
      const blogIndex = blogsData.findIndex((blog) => blog.id === id);
      if (blogIndex === -1) {
        throw new Error(`Blog with ID ${id} not found.`);
      }
      const updatedBlog = { ...blogsData[blogIndex], ...input };
      blogsData[blogIndex] = updatedBlog;
      fs.writeFileSync("./data/blogs.json", JSON.stringify(blogsData));
      return updatedBlog;
    },
    deleteBlog: (_, { id }) => {
      const blogIndex = blogsData.findIndex((blog) => blog.id === id);
      if (blogIndex === -1) {
        throw new Error(`Blog with ID ${id} not found.`);
      }
      const deletedBlog = blogsData[blogIndex];
      blogsData.splice(blogIndex, 1);
      fs.writeFileSync("./data/blogs.json", JSON.stringify(blogsData));
      return deletedBlog;
    },
  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
