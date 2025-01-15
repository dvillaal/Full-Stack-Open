const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('there are two notes', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the unique identifier is id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]
    const response = await api
        .get(`/api/blogs/${blog.id}`)
    
    assert.strictEqual(typeof response.body.id, 'string')
    assert.strictEqual(response.body._id, undefined)
})

describe.only('addition of blogs in db', () => {
    
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('a valid blog can be added', async() => {
        const loggedUser = await helper.logUserInDb(api)
        
        const newBlog = {
            title: 'async',
            author: 'async',
            user: loggedUser.body.id,
            url: 'async',
            likes: 3
        }
    
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${loggedUser.body.token} `)
        
        const blogsAtEnd = await helper.blogsInDb()
    
        assert.deepStrictEqual(response.body, {...newBlog, id: response.body.id})
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })
    
    test('post without likes, likes default is zero', async () => {
        const loggedUser = await helper.logUserInDb(api)

        const newBlog = {
            title: 'async',
            author: 'async',
            user: loggedUser.body.id,
            url: 'async'    
        }
    
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${loggedUser.body.token} `)
                
        assert.strictEqual(response.body.likes, 0)
    })

    test('blog without title or url is not added', async() => {
        const loggedUser = await helper.logUserInDb(api)

        const newBlogWithoutTitle = {
            author: 'async',
            url: 'async',
            likes: 3    
        }
    
        const newBlogWithoutUrl = {
            author: 'async',
            url: 'async',
            likes: 3    
        }
    
        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitle)
            .set('Authorization', `Bearer ${loggedUser.body.token} `)
            .expect(400)
        
        await api
            .post('/api/blogs')
            .send(newBlogWithoutUrl)
            .set('Authorization', `Bearer ${loggedUser.body.token} `)
            .expect(400)
    })
    
    test('deletion of a blog with valid id', async () => {
        const loggedUser = await helper.logUserInDb(api)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelte = blogsAtStart[0]
    
        await api
            .delete(`/api/blogs/${blogToDelte.id}`)
            .set('Authorization', `Bearer ${loggedUser.body.token} `)
            .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    
        const titles = blogsAtEnd.map(r => r.title)
        assert(!titles.includes(blogToDelte.title))
    })

    test.only('post without token is unauthorized', async() => {        
        const newBlog = {
            title: 'async',
            author: 'async',
            url: 'async',
            likes: 3
        }
    
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
        
        const blogsAtEnd = await helper.blogsInDb()
    
        assert.deepStrictEqual(response.body, { "error": "token invalid" })
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})


test('update a valid note', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = await blogsAtStart[0]

    const updatedBlog = {
        title: 'async',
        author: 'async',
        url: 'async',
        likes: 3,
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

    const titles = blogsAtEnd.map(r => r.title)
    assert(titles.includes(updatedBlog.title))

})

after(async () => {
    await mongoose.connection.close()
})