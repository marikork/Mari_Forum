import React, { useState, useEffect } from "react"
import "./styles/App.scss"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Topics from "./pages/Topics"
import Topic from "./pages/Topic"
import { User, OpenTopic } from "./types"
import {
  Container, Hr, H1
} from "./styles/styles"

const App = () => {
  const [topics, setTopics] =useState<OpenTopic[]>([])

  const addNewTopic = (topic:OpenTopic) => {
    setTopics(prevTopics => [...prevTopics, topic])
  }

  useEffect(() => {
    /*
    fetch("http://localhost:8080/hello")
      .then(res => res.json())
      .then(data => console.log(data))
      */
  }

  )
  return (
    <Container>
      <div className="App">
        <H1>Our Forum</H1>
        <Hr/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/topics" element={<Topics/>}/>
          <Route path="topics/:id" element={<Topic/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>

      </div>
    </Container>
  )
}

export default App
