import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, eliminateNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		if (filter === '') {
			return anecdotes
		}
		else {
			const anecdotesToShow = anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
			return anecdotesToShow
		}
	})
	const dispatch = useDispatch()

	const vote = (id) => {
		const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id)
		const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
		dispatch(addVote(id, votedAnecdote))

		dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5000))
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
		)}
	</div>
	)
}

export default AnecdoteList