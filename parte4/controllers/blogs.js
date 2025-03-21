const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    const body = request.body

    const user = request.user
    user.blogs = user.blogs.filter(blog => blog.id !== request.params.id)

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true }).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body

    const user = request.user

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        user: user.id,
        url: body.url,
        likes: body.likes,
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

module.exports = blogsRouter