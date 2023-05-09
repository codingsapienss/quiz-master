import React, { useState } from 'react'
import "./Question.css"
import { Alert, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Question = ({currentQues, setCurrentQues,questions, options, score,setScore, correct}) => {


  const [selected, setSelected] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleSelect =(i) =>{
    if(selected === i && selected=== correct){
      return 'select'
    }else if(selected === i && selected !== correct){
      return 'wrong'
    }else if( i === correct ) {
      return "select"
    }
  }

  const handleQuit = ()=> {
    
  }

  const handleNext = ()=> {
    if(currentQues>13){
      navigate('/result')
    } else if(selected){
      setCurrentQues(currentQues+1)
      setSelected()
      setError(false)
    }else{
      setError(true)
    }
  }

  const handleCheck = (i)=>{
    setSelected(i);
    if(i === correct) setScore(score+1)
    setError(false)
  }

  return (
    <div className='quesContainer'>
      <h1> Question {currentQues+1} </h1>
      <div className="singleQues">
        <h2>{questions[currentQues].question}</h2>
        <div className="alert">
        { error && <Alert variant="filled" severity="error">Please select an option first !</Alert>}

        </div>
       
        <div className="options">

        {options && 
          options.map((opt)=>{
            return <button 
            onClick={()=>{handleCheck(opt)}} 
            className={ `singleOption  ${selected && handleSelect(opt)} ` }
              key={opt}
              disabled={selected}
            >{opt}</button>
          })
          
        }

        </div>

        <div className="controls">
          <Button variant='contained' color="secondary" 
          size="large" onClick={handleQuit}>Quit</Button>


          <Button onClick={handleNext} variant='contained' color="primary" 
          size="large">Next </Button>
        </div>

      </div>
    </div>
  )
}

export default Question