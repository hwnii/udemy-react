import { useCallback, useRef, useState } from 'react'

import QUESTIONS from '../../questions.js'

import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer'
import Answers from './Answers.jsx'

export default function Quiz() {
  const [answerState, setAnswerState] = useState('')
  const [userAnswers, setUserAnswers] = useState([])

  // !! 사용자의 응답이 공백이면(아무것도 선택하지 않으면) 현재 문제의 index 저장
  // !! answered or correct or wrong인 경우 이미 userAnswers 배열의 길이가 + 1
  // !! 되었기 때문에 그 이전의 값으로 정답 비교를 하기 위해서 - 1 하는 것 같음
  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      // 1. 처음 select를 하면 answered로 저장됨
      setAnswerState('answered')
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer]
      })

      setTimeout(() => {
        // 2. 선택한 answer가 정답이면 correct, 오답이면 wrong
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct')
        } else {
          setAnswerState('wrong')
        }

        // 3. 2초 뒤에 사용자의 응답이 공백으로 다시 변함
        setTimeout(() => {
          setAnswerState('')
        }, 2000)
      }, 1000)
    },
    [activeQuestionIndex],
  )

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

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          answers={QUESTIONS[activeQuestionIndex].answers}
          // selectedAnswers가 length - 1인 이유는 index가 0부터 시작이기 때문이지
          selectedAnswers={userAnswers[userAnswers.length - 1]}
          answersState={answerState}
        />
      </div>
    </div>
  )
}
