const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, showBlogDiv, like } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'David Villa',
        username: 'dvilla',
        password: 'alzate',
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByText('username')
    await expect(username.getByRole('textbox')).toBeVisible()

    const password = await page.getByText('password')
    await expect(password.getByRole('textbox')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Wrong username or password')).not.toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      const errorDiv = await page.locator('.error-notification')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()

      const title = await page.getByText('title')
      await title.getByRole('textbox').fill('Note by playwright')

      const author = await page.getByText('author')
      await author.getByRole('textbox').fill('Matti')

      const url = await page.getByText('url')
      await url.getByRole('textbox').fill('www.blog.com')

      await page.getByRole('button', { name: 'create' }).click()

      const notificationDiv = await page.locator('.successful-notification')
      await expect(notificationDiv).toContainText('a new blog Note by playwright by Matti added')
      await expect(notificationDiv).toHaveCSS('border-style', 'solid')
      await expect(notificationDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

      await page.pause()

      const blogs = await page.getByTestId('blogs')
      await expect(blogs).toContainText('Note by playwright Matti')

      const blogDiv = await blogs.getByText('Note by playwright Matti').locator('..')
      await blogDiv.getByRole('button', { name: 'show' }).click()
      await expect(blogDiv).toContainText('www.blog.com')
    })

    describe('When a blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Note by playwright', 'Matti', 'www.blog.com')
      })

      test('a blog can be edited', async ({ page }) => {
        await showBlogDiv(page, 'Note by playwright Matti')

        const likesDiv = await page.getByText('likes')
        await expect(likesDiv).toContainText('0')
        await likesDiv.getByRole('button', { name: 'like' }).click()
        await expect(likesDiv).toContainText('1')
      })

      test('a blog can be removed', async  ({ page }) => {
        await showBlogDiv(page, 'Note by playwright Matti')

        const blogs = await page.getByTestId('blogs')
        const blogDiv = await blogs.getByText('Note by playwright Matti').locator('..')

        page.on('dialog', async dialog => {
          console.log(dialog.message)
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'Remove' }).click()

        await expect(blogDiv).not.toBeVisible()
      })

      test('only the creator can see delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'dvilla', 'alzate')

        await showBlogDiv(page, 'Note by playwright Matti')
        await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
      })

    })

    test('blogs are ordered by likes', async ({ page }) => {
      await createBlog(page, 'Note by playwright 1', 'Mati', 'www.blog1.com')
      await createBlog(page, 'Note by playwright 2', 'Santi', 'www.blog2.com')
      await createBlog(page, 'Note by playwright 3', 'David', 'www.blog3.com')

      await showBlogDiv(page, 'Note by playwright 1')
      await showBlogDiv(page, 'Note by playwright 2')
      await showBlogDiv(page, 'Note by playwright 3')

      await like(page, 'Note by playwright 2', 1)
      await like(page, 'Note by playwright 2', 2)
      await like(page, 'Note by playwright 2', 3)
      await like(page, 'Note by playwright 3', 1)
      await like(page, 'Note by playwright 3', 2)
      await like(page, 'Note by playwright 1', 1)

      await page.pause()

      const blogs = await page.getByTestId('blogs').locator('.blog').all()

      await expect(blogs[0].getByText('Note by playwright 2 Santi')).toBeVisible()
      await expect(blogs[1].getByText('Note by playwright 3 David')).toBeVisible()
      await expect(blogs[2].getByText('Note by playwright 1 Mati')).toBeVisible()

    })
  })
})