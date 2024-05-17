import { useCallback, useEffect, useState } from 'react'

import QUESTIONS from '../questions'

import quizCompleteImg from './assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer'

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  // activeQuestionIndex를 상태로 관리하는 것보다 질문이 끝나면 userAnswer 상태 배열에 담기기 때문에
  // 하나의 답변이 추가되면 첫 번째 질문에 대한 답변이 이루어졌다는 뜻이기에 인덱스 값은 1이 되고 질문 배열에는
  // 두 번째 질문이 있을 것이다.

  // 최소한의 상태를 가지는 것이 좋기 때문에 이런 생각을 계속해서 해내는 것이 좋다.
  const activeQuestionIndex = userAnswers.length
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer,
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer]
    })
  },
  [])

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  )

  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img src={quizCompleteImg} alt='Quiz Complete' />
        <h2>Quiz Completed!</h2>
      </div>
    )
  }

  const suffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
  suffledAnswers.sort(() => Math.random() - 0.5)

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          timeout={10000}
          onTimeout={handleSkipAnswer} //null이여도 배열은 채우기 때문에
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {suffledAnswers.map((answer) => (
            <li key={answer} className='answer'>
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
