const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blogPost) => {
    return sum + blogPost.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const reducer = (favorite, current) => {
    return current.likes > favorite.likes ? current : favorite;
  };

  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const counts = {};

  for (let blog of blogs) {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
  }

  const author = Object.entries(counts).reduce(
    (authorWithMostBlogs, current) => {
      return current[1] > authorWithMostBlogs[1]
        ? current
        : authorWithMostBlogs;
    },
  );

  return { author: author[0], blogs: author[1] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const counts = {};

  for (let blog of blogs) {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes;
  }

  const author = Object.entries(counts).reduce(
    (authorWithMostLikes, current) => {
      return current[1] > authorWithMostLikes[1]
        ? current
        : authorWithMostLikes;
    },
  );

  return { author: author[0], likes: author[1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
