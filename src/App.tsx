import { useEffect, useState } from 'react'
import './App.css'
import {TbAntennaBars5} from 'react-icons/tb'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi2'
import { BiSolidBattery} from 'react-icons/bi'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 0]
const password = '1234'

function App() {
  const [isCorrect, setIsCorrect] = useState(false)
  const [pressedNum, setPressedNum] = useState<(number| string)[]>([])
  const [currentTime, setCurrentTime] = useState<string>('')
  const [filled, setFilled] = useState<number>(0)
  const [answer, setAnswer] = useState<string>("Emergency")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }

      setCurrentTime(now.toLocaleTimeString(undefined, options))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
     if(pressedNum.length === password.length){
      if(pressedNum.join('') === password){
        setIsCorrect(true)
      }else{
        setTimeout(() => {
          setPressedNum([])
          setFilled(0)
        }, 1000)
      }
    }
  },[pressedNum])

  const fillDots = () => {
    if(filled < 4){
      setFilled(filled+ 1)
    }
    console.log('filled')
  }

  const retry = () => {
    setIsCorrect(false)
    setPressedNum([])
    setFilled(0)
    setAnswer("Emergency")
  }

  const dots = Array(4).fill(null).map((_, idx) => (
    <div 
      key={idx}
      className={`dot ${idx < filled ? 'filled' : ''}`}
    >
    </div>
  ))

  return (
    <>
      <header className='top'>
        <p className='carrier'>{currentTime}</p>
        <div className='icons'>
          <TbAntennaBars5 size={25}/>
          <p>5G</p>
          <BiSolidBattery size={25}/>
        </div>
      </header>
      {isCorrect ? 
          <HiLockOpen size={25} /> 
        : 
        <>
          <HiLockClosed size={25} /> 
          <p className='enter'>Enter Passcode</p>
          <div 
            className={`dots ${pressedNum.length === 4 && isCorrect === false ? 'shake' : ""}`}>
            {dots}
          </div>
          <div className='num-pad'>

            {numbers.map((number, idx) => (
              <button
                className={number === 0 ? "zero" : ""}
                key={idx}
                onClick={() => {
                  setPressedNum((cur) => [...cur, number])
                  fillDots()
                }}
              >
                {number}
              </button>
            ))}
          </div></>
      }
      <footer>
        <button onClick={() => setAnswer("Pass is 1234")}>{answer}</button>
        <button onClick={retry}>{isCorrect ? 'Retry' : 'Cancel'}</button>
      </footer>
    </>
  )
}

export default App
