const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user') 
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async(request, response) => {
	const blogs = await Blog.find({}).populate('user',{username:1,name:1})
	response.json(blogs)
  })
  
blogsRouter.post('/', async(request, response) => {
	const body = request.body


	const user = request.user
	
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})
	

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	
	response.status(201).json(savedBlog)
	  
  })

blogsRouter.delete('/:id', async(request, response) => {
	const blog = await Blog.findById(request.params.id);
	const user = request.user
	const userid = user.id;

	if ( blog.user.toString() === userid.toString() ){
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	}else{
		return response.status(403).json({ error: 'You do not have permission to delete this blog post.' })
	}
	
})

blogsRouter.put('/:id', async(request, response, next) => {
	const body = request.body
  
	const blog = {
	  title: body.title,
	  author: body.author,
	  url: body.url,
	  likes: body.likes
	}

  
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog)
	
  })
  
  module.exports = blogsRouter