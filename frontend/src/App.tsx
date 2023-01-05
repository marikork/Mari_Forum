import React, { useState, useEffect } from "react"
import {
  Routes, Route
} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Topics from "./pages/Topics"
import Topic from "./pages/Topic"
import {
  Container, Hr, H1, MainHeaderLink, NavBar, NavLink
} from "./styles/styles"
import UpdateMessage from "./pages/UpdateMessage"
import UpdateTopic from "./pages/UpdateTopic"
import { useNavigate } from "react-router-dom"

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("user")){
      setUserLoggedIn(true)
    }
  }, [])

  const onLogoutClick = () => {

    localStorage.setItem("user", "")
    localStorage.removeItem("user")
    localStorage.setItem("token", "")
    localStorage.removeItem("token")
    localStorage.setItem("timeTokenCreated", "")
    localStorage.removeItem("timeTokenCreated")
    setUserLoggedIn(false)
    navigate(0)
  }

  return (
    <Container>
      <H1><MainHeaderLink to={"/"}>Our Forum</MainHeaderLink></H1>
      <NavBar>
        {userLoggedIn?
          <NavLink onClick={onLogoutClick} to="/">Logout</NavLink>
          : ""
        }
      </NavBar>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/topics" element={<Topics/>}/>
        <Route path="topics/:id" element={<Topic/>}/>
        <Route path="topics/:id/:index" element={<UpdateMessage/>}/>
        <Route path="topics/update/:id" element={<UpdateTopic/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Container>
  )
}

export default App
