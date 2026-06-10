import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </>
    );
  }

  const avg = (good - bad) / 3;
  const positive = (good / all) * 100;

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={avg} />
          <StatisticLine text="Positive" value={`${positive.toFixed(2)} %`} />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
