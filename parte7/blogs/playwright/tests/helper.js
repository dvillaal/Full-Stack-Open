const loginWith = async (page, username, password) => {
  const usernameScreen = await page.getByText('username')
  await usernameScreen.getByRole('textbox').fill(username)

  const passwordScreen = await page.getByText('password')
  await passwordScreen.getByRole('textbox').fill(password)

  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new note' }).click()

  const titleScreen = await page.getByText('title')
  await titleScreen.getByRole('textbox').fill(title)

  const authorScreen = await page.getByText('author')
  await authorScreen.getByRole('textbox').fill(author)

  const urlScreen = await page.getByText('url')
  await urlScreen.getByRole('textbox').fill(url)

  await page.getByRole('button', { name: 'create' }).click()
  const blogs = await page.getByTestId('blogs')
  await blogs.getByText(title).waitFor()
}

const showBlogDiv = async (page, blog) => {
  const blogs = await page.getByTestId('blogs')
  const blogDiv = await blogs.getByText(blog).locator('..')
  await blogDiv.getByRole('button', { name: 'show' }).click()
}

const like = async (page, blog, expectedLikes) => {
  const blogs = await page.getByTestId('blogs')
  const blogDiv = await blogs.getByText(blog).locator('..')
  await blogDiv.getByRole('button', { name: 'like' }).click({ timeout: 500 })

  await blogDiv.getByText(`likes ${expectedLikes}`).waitFor()
}

export { loginWith, createBlog, showBlogDiv, like }