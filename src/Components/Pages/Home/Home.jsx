import React, { useState } from "react";
import "./Home.css";
import { Button, MenuItem, TextField, Alert } from "@mui/material";
import Categories from "../../../Data/Category.js";

import { useNavigate } from "react-router-dom";




const Home = ({ name, setName, fetchQuestions }) => {

  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true)
      return
    } else {
      setError(false)
      fetchQuestions(category, difficulty, name)
      navigate('/quiz')
    }
  }

  // console.log(name, category, difficulty)
  return (


    <div className="container">
      <div className="setting">
        Quiz Setting
        <div className="settingsSelect">

          {error && <Alert variant="filled" severity="error">Fill all the fields first !</Alert>}
          <TextField style={{ margin: 20 }} label="Enter Your Name" variant="outlined" onChange={(e) => { setName(e.target.value) }} />


          <TextField style={{ margin: 20 }} className="textField" select label="Select Category" variant="outlined" value={category}
            onChange={(e) => { setCategory(e.target.value) }} >
            {
              Categories.map((cat) => {
                return <MenuItem key={cat.value} value={cat.value}  > {cat.category} </MenuItem>
              })
            }

          </TextField>

          <TextField style={{ margin: 20 }} className="textField" select label="Select Difficulty" variant="outlined"
            value={difficulty} onChange={(e) => { setDifficulty(e.target.value) }}>
            <MenuItem key='easy' value='easy'  >
              Easy
            </MenuItem>
            <MenuItem key='medium' value='medium'  >
              Medium
            </MenuItem>
            <MenuItem key='hard' value='hard'   >
              Hard
            </MenuItem>
          </TextField>

          <Button onClick={handleSubmit} variant="contained" color="success" >Start Quiz</Button>
        </div>
      </div >
      <img src="./quiz_icon.svg" alt="" />
    </div>
  );
};

export default Home;
