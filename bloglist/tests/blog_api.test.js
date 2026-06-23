const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there are blogs saved to the DB", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    const firstBlog = response.body[0];
    assert(firstBlog.id);
    assert.strictEqual(firstBlog._id, undefined);
  });
});

describe("when updating a blog", () => {
  test("blog is successfully updated with valid data", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const selectedBlog = blogsAtStart[0];

    const newBlog = { ...selectedBlog, likes: selectedBlog.likes + 1 };

    await api.put(`/api/blogs/${selectedBlog.id}`).send(newBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === selectedBlog.id);

    // assert blog's number of likes changed
    assert.strictEqual(updatedBlog.likes, selectedBlog.likes + 1);
    // assert total blog count stayed the same
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
});

describe("when adding a new blog", () => {
  test("succeeds with valid data", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const newBlog = {
      title: "Python 101",
      author: "Sami Smith",
      url: "www.learnpython.com",
      likes: 40,
    };

    await api.post("/api/blogs").send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => blog.title);

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
    assert(titles.includes("Python 101"));
  });

  test("missing likes property defaults to 0", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const newBlog = {
      title: "TypeScript 101",
      author: "Matt Pocock",
      url: "www.learnts.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    const addedBlog = blogsAtEnd.find(
      (blog) => blog.title === "TypeScript 101",
    );

    assert.strictEqual(addedBlog.likes, 0);
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
  });

  test("missing title property results in 400 bad request", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const newBlog = {
      author: "Sami Smith",
      url: "www.learnpython.com",
      likes: 40,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });

  test("missing url property results in 400 bad request", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const newBlog = {
      title: "Python 101",
      author: "Sami Smith",
      likes: 40,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
});

describe("when deleting a blog", () => {
  test("succeeds if valid blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

    const ids = blogsAtEnd.map((blog) => blog.id);
    assert(!ids.includes(blogToDelete.id));
  });
});

after(async () => {
  await mongoose.connection.close();
});
