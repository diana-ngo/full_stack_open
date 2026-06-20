const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);

  assert.strictEqual(result, 1);
});

describe("totalLikes", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(emptyList);

    assert.strictEqual(result, 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);

    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);

    assert.strictEqual(result, 19);
  });
});

describe("favoriteBlog", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("of empty list is null", () => {
    const result = listHelper.favoriteBlog(emptyList);

    assert.strictEqual(result, null);
  });

  test("when list has only one blog equals that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);

    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);

    assert.deepStrictEqual(result, {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    });
  });
});

describe("mostBlogs", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      author: "Edsger W. Dijkstra",
    },
  ];

  const listWithMultipleBlogs = [
    {
      author: "Edsger W. Dijkstra",
    },
    {
      author: "Edsger W. Dijkstra",
    },
    {
      author: "Edsger W. Dijkstra",
    },
    {
      author: "John W. Dijkstra",
    },
    {
      author: "John W. Dijkstra",
    },
  ];

  test("of empty list is null", () => {
    const result = listHelper.mostBlogs(emptyList);

    assert.strictEqual(result, null);
  });

  test("when list has only one blog equals that blog's author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);

    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("when list has multiple blogs is calculated right", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);

    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 3 });
  });
});

describe("mostLikes", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
  ];

  const listWithMultipleBlogs = [
    {
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      author: "John W. Dijkstra",
      likes: 15,
    },
    {
      author: "John W. Dijkstra",
      likes: 15,
    },
  ];

  test("of empty list is null", () => {
    const result = listHelper.mostLikes(emptyList);

    assert.strictEqual(result, null);
  });

  test("when list has only one blog equals that blog's author", () => {
    const result = listHelper.mostLikes(listWithOneBlog);

    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 5 });
  });

  test("when list has multiple blogs is calculated right", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);

    assert.deepStrictEqual(result, { author: "John W. Dijkstra", likes: 30 });
  });
});
