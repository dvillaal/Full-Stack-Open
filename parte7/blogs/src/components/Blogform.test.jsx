import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls the event handler when new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const component = render(<BlogForm createBlog={createBlog}/>)

  const inputs = component.getAllByRole('textbox')

  await user.type(inputs[0], 'titulo')
  await user.type(inputs[1], 'author')
  await user.type(inputs[2], 'url')
  const sendButton = component.getByText('create')

  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
})