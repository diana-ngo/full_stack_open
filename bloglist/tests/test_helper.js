const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "JavaScript 101",
    author: "Martin Fowler",
    url: "www.javascript.info",
    likes: 25,
  },
  {
    title: "Express 101",
    author: "John Smith",
    url: "www.codeinexpress.com",
    likes: 12,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
