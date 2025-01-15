const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const User = require('../models/user')


describe('test about addiotion of users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('creation fails with proper statuscode and mesage if username is not valid', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'dv',
            name: 'David',
            password: 'sakret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('User validation failed'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and mesage if password is not valid', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'dvillaal',
            name: 'David',
            password: 'sa'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('password is shorter than the minimum'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test.only('addition with a valid user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'dvillaal',
            name: 'David',
            password: 'sasss'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
        
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
})

after(async () => {
    await mongoose.connection.close()
})