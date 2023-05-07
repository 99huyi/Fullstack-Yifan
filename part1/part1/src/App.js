import { useState } from 'react'
const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>  
  );
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = good + neutral + bad
  if (total) {
      return(
        <table>
        <tbody>
          <tr><StatisticLine text="good" value ={good} /></tr>
          <tr><StatisticLine text="neutral" value ={neutral} /></tr>
          <tr><StatisticLine text="bad" value ={bad} /></tr>
          <tr><StatisticLine text="all" value ={good + neutral + bad} /></tr>
          <tr><StatisticLine text="average" value ={(good - bad) / (good + neutral + bad)} /></tr>
          <tr><StatisticLine text="positive" value ={good / (good + neutral + bad) * 100 + "%"} /></tr>
        </tbody>
      </table>
      )
  } else {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  var ary = new Uint8Array(anecdotes.length);
  const [votes, setVotes] = useState(ary)
  const [selected, setSelected] = useState(0)
  
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function addvote(votes,selected) {
    const copy = [...votes]
    copy[selected] += 1
    return copy
  }
  function findmax(votes) {
    const max = Math.max(...votes)
    const ind = votes.findIndex((element) => element === max)
    return ind
  }
  /*console.log(votes)
  console.log(selected)*/
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>

      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}<br />
      has {votes[selected]} votes <br />
      <Button handleClick={() => setSelected(randomNumberInRange(0,anecdotes.length-1))} text="next anecdote"/>
      <Button handleClick={() => setVotes(addvote(votes,selected))} text="vote"/>
      </p>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[findmax(votes)]}<br />
      has {votes[findmax(votes)]} votes <br />
      <br />{votes}<br />
      </p>
  
    </div>
  )
}

export default App