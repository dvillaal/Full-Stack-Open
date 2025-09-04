import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, eliminateNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const anecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`a new anecdote ${content} added`, 5000))
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={anecdote}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm