const _ = require('lodash');

const totalLikes = (blogs) => {
	const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0);

	return likes
  }

const favoriteBlog = (blogs) =>{
	const blogWithMostLikes = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0]);

	const result = {
		title: blogWithMostLikes.title,
		author: blogWithMostLikes.author,
		likes: blogWithMostLikes.likes
	  };

	  return result
}

const mostBlogs = (blogs) =>{

	const authorWithMostBlogs = _(blogs)
	.countBy('author')
	.map((blogs, author) => ({ author, blogs }))
	.maxBy('blogs');

	return authorWithMostBlogs
}

const mostLikes = (blogs) =>{
	
	const authorWithMostLikes = _(blogs)
	.groupBy('author')
	.map((authorBlogs, author) => ({
	author,
	likes: _.reduce(authorBlogs, (sum, blog) => sum + blog.likes, 0)
	}))
	.maxBy('likes');

	return authorWithMostLikes; // Outputs: { author: 'Edsger W. Dijkstra', likes: 17 }
}
  
  module.exports = {
	totalLikes, favoriteBlog, mostBlogs, mostLikes
  }