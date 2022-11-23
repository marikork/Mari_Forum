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

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [topics, setTopics] =useState<OpenTopic[]>([])

  const login = () => {
    setUserLoggedIn(true)
  }

  const logout = () => {
    setUserLoggedIn(false)
  }

  const addNewTopic = (topic:OpenTopic) => {
    setTopics(prevTopics => [...prevTopics, topic])
  }

  useEffect(() => {
    fetch("http://localhost:8080/hello")
      .then(res => res.json())
      .then(data => console.log(data))
  }

  )
  return (
    <div className="App">
      <h1>Our Forum</h1>

      <Routes>
        <Route path="/login" element={<Login onLogin={login}/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/topics" element={<Topics topics={topics} addNewTopic={addNewTopic}/>}/>
        <Route path="topics/:id" element={<Topic topics={topics}/>}/>
        <Route path="/" element={<Home currentUser={userLoggedIn} onLogout={logout} topics={topics} addNewTopic={addNewTopic}/>}/>
      </Routes>

    </div>
  )
}

export default App
