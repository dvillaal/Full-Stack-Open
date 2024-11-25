import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const NoStatistics = () => {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
 
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}  

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)

  }
  const handlBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handlBadClick} text='bad'/>
      </div>
      <h1>statistics</h1>
      {good + neutral + bad === 0 ? <NoStatistics /> :
      <div>
        <StatisticsLine text='good' value={good}/>
        <StatisticsLine text='neutral' value={neutral}/>
        <StatisticsLine text='bad' value={bad}/>
        <StatisticsLine text='all' value={good + neutral + bad}/>
        <StatisticsLine text='average' value={(good - bad)/(good + neutral + bad)}/>
        <StatisticsLine text='positive' value={`${good/(good + neutral + bad)*100} %`} />
      </div>
      }
    </div>
  )
}

export default App