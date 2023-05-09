import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Route , Routes} from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Quiz from "./Components/Pages/Quiz/Quiz";
import Result from "./Components/Pages/Result/Result";
import axios from "axios";



const App = () => {
 
  const [name, setName] = useState('') 
  const [questions, setQuestions] = useState() 
  const [score, setScore] = useState(0) 

  const fetchQuestions = async (category="", difficulty="")=>{
    const {data} =  await axios.get(`https://opentdb.com/api.php?amount=15&${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`)

    setQuestions(data.results);
    // console.log(data);
  }

  
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
           <Routes>
           <Route path="/"  element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />}
           />
           <Route path="/quiz" element={<Quiz name={name} questions={questions}  score={score} setScore= {setScore} />} />
           <Route path="/result" element={<Result name={name} score={score}/>} />
           </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
