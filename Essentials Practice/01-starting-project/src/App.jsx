import { useState } from 'react';
import Header from './components/Header';
import Result from './components/Result';
import UserInput from './components/UserInput';
import { calculateInvestmentResults } from './util/investment';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputValid = userInput.duration > 0;

  const results = calculateInvestmentResults(userInput);

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputValid && (
        <p className='center'>Please enter valid input than zero.</p>
      )}
      {inputValid && <Result results={results} />}
    </>
  );
}

export default App;
