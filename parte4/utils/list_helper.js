const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((totalLikes, currentLike) => totalLikes + currentLike.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}

    let favorite = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })

    const { _id, url, __v, ...newFavorite } = favorite

    return newFavorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}
    

    const everyAuthors = _.countBy(blogs, 'author')

    const everyAuthorsList = Object.entries(everyAuthors).map(([author, blogs]) => ({author, blogs}))

    let mostAuthor = everyAuthorsList[0]

    everyAuthorsList.forEach(author => {
        if (author.blogs > mostAuthor.blogs) {
            mostAuthor = author
        }
    })

    return mostAuthor

}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}
    
    const authors = _.groupBy(blogs, 'author')

    const likesOfAuthor = _.map(authors, (author) => {
        return {
            author: author[0].author,
            likes: _.sumBy(author, 'likes')
        }
    })

    let mostLikes = likesOfAuthor[0]

    likesOfAuthor.forEach(author => {
        if (author.likes > mostLikes.likes) {
            mostLikes = author
        }
    })

    return mostLikes

}

const bigList = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]

mostLikes(bigList)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}