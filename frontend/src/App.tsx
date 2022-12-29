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
import {
  Container, Hr, H1
} from "./styles/styles"
import UpdateMessage from "./pages/UpdateMessage"

const App = () => {

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
          <Route path="topics/:id/:index" element={<UpdateMessage/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>

      </div>
    </Container>
  )
}

export default App
