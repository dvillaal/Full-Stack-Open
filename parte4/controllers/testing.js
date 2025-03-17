const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const users = await User.find({})
    const blogs = await Blog.find({})

    response.status(204).end()
})

module.exports = testingRouter