import { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout)

  useEffect(() => {
    console.log('QuestionTimer 렌더링!!!!!!!!!!!!!!!!!!!!!')
  }, [])

  useEffect(() => {
    console.log('SETTING TIMEOUT')
    setTimeout(onTimeout, timeout)
  }, [timeout, onTimeout])

  useEffect(() => {
    console.log('SETTING INTERVAL')
    setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
    }, 100)
  }, [])

  return <progress value={remainingTime} max={timeout} />
}
