import React, { useState } from 'react'
import "./Question.css"
import { Alert, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import he from 'he';

const Question = ({ setName, currentQues, setCurrentQues, questions, setQuestions, options, score, setScore, correct }) => {


  const [selected, setSelected] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return 'select'
    } else if (selected === i && selected !== correct) {
      return 'wrong'
    } else if (i === correct) {
      return "select"
    }
  }

  const handleQuit = () => {
    navigate('/')
    setScore(0)
    setCurrentQues(0)
    setQuestions()
    setName('')
  }

  const handleNext = () => {
    if (currentQues > 13) {
      navigate('/result')
    } else if (selected) {
      setCurrentQues(currentQues + 1)
      setSelected()
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1)
    setError(false)
  }

  return (
    <div className='quesContainer'>
      <div className="singleQues">
        <h2> {currentQues + 1}. {he.decode(questions[currentQues].question)}</h2>
        <div className="alert">
          {error && <Alert variant="filled" severity="error">Please select an option first !</Alert>}

        </div>

        <div className="options">

          {options &&
            options.map((opt) => {
              return <button
                onClick={() => { handleCheck(opt) }}
                className={`singleOption  ${selected && handleSelect(opt)} `}
                key={opt}
                disabled={selected}
              >{he.decode(opt)}</button>
            })

          }

        </div>

        <div className="controls">
          <Button variant='contained' color="secondary"
            size="medium" onClick={handleQuit}>Quit</Button>


          <Button onClick={handleNext} variant='contained' color="primary"
            size="medium" >Next </Button>
        </div>

      </div>
    </div>
  )
}

export default Question