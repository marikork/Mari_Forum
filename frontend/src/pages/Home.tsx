import React, { useState, useEffect } from "react"
import Topics from "./Topics"
import LoginService from "../services/LoginService"
import {
  H2, WelcomeContainer, LinkRow, Button, ButtonRow, SubContainer
} from "../styles/styles"

const Home = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if(localStorage.getItem("user")){
      setUserLoggedIn(true)
    }
  }, [])

  const onLogoutClick = () => {
    /*
    const user:string|null = localStorage.getItem("user")
    const token:string|null = localStorage.getItem("token")

    if(user && token){
      LoginService.logoutUser(token)
    }
    */
    localStorage.setItem("user", "")
    localStorage.removeItem("user")
    localStorage.setItem("token", "")
    localStorage.removeItem("token")
    setUserLoggedIn(false)
  }

  return(
    <div>
      {userLoggedIn?
        <>
          <SubContainer>
            <ButtonRow>
              <Button onClick={onLogoutClick}>Logout</Button>
            </ButtonRow>
          </SubContainer>
          <Topics/>
        </>
        :
        <>
          <WelcomeContainer>
            <H2>Welcome to discuss</H2>
            <LinkRow>Login to your account: <a href="/login"><Button>Login</Button></a></LinkRow>
            <LinkRow>Create a new account: <a href="/register"><Button>Register</Button></a></LinkRow>
          </WelcomeContainer>
        </>
      }

    </div>
  )
}

export default Home