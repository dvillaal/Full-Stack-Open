import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach } from 'vitest'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Title',
      author: 'Author',
      url: 'Url',
      user: {
        name: 'David',
        id: 0
      }
    }

    const user = { id: 0 }

    component = render(<Blog blog={blog} user={user}/>)
  })

  test('at start title and blog are displayed but url and likes not' , () => {
    component.findAllByText('Title')
    component.findAllByText('Author')
    const url = component.container.querySelector('url')
    expect(url).not.toBeInTheDocument()
    const likes = component.container.querySelector('likes')
    expect(url).not.toBeInTheDocument()
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()

    const button = component.getByText('show')
    await user.click(button)

    component.findAllByText('Url')
    component.findAllByText('0')
  })
})

test('after clicking the like button 2 times, the controller is called 2 times', async () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'Url',
    likes: 0,
    user: {
      name: 'David',
      id: 0
    }
  }

  const userId = { id: 0 }

  const handleLike = vi.fn()
  const component = render(<Blog blog={blog} user={userId} updateLike={handleLike}/>)

  const user = userEvent.setup()

  const button = component.getByText('show')
  await user.click(button)


  const likeButton = component.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleLike.mock.calls).toHaveLength(2)
})