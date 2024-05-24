import { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout)

  // Timeout
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout)

    return () => {
      clearTimeout(timer)
    }
  }, [timeout, onTimeout])

  // Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <progress value={remainingTime} max={timeout} />
}
