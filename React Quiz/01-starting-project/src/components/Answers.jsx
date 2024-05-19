import { useRef } from 'react'

export default function Answers({ answers, selectedAnswers, answerState }) {
  const shuffledAnswers = useRef()

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers]
    shuffledAnswers.current.sort(() => Math.random() - 0.5)
  }

  return (
    <ul id='shuffles'>
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswers === answer
        let cssClasses = ''

        if (answerState === 'answered' && isSelected) {
          cssClasses = 'selected'
        }

        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClasses = answerState
        }

        return (
          <li key={answer} className='answer'>
            <button
              onClick={() => handleSelectAnswer(answer)}
              className={cssClasses}
            >
              {answer}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
