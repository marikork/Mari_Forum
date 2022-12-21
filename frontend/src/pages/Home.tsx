import React, { useState, useEffect } from "react"
import Topics from "./Topics"
import LoginService from "../services/LoginService"
import {
  H2, WelcomeContainer, LinkRow, Button, ButtonRow, SubContainer
} from "../styles/styles"

const Home = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if(localStorage.getItem("user") && localStorage.getItem("token") && localStorage.getItem("timeTokenCreated")){
      const tokenCreated = localStorage.getItem("timeTokenCreated")
      if(tokenCreated){
        const timeTokenCreated = new Date(tokenCreated)
        const timeNow = new Date()
        const tokenExpirationTime = timeTokenCreated.setMilliseconds(timeTokenCreated.getMilliseconds() + 99990)
        const tokenExpirationTimeAsDate = new Date()
        tokenExpirationTimeAsDate.setTime(tokenExpirationTime)
        if(timeNow > tokenExpirationTimeAsDate){
          localStorage.setItem("user", "")
          localStorage.removeItem("user")
          localStorage.setItem("token", "")
          localStorage.removeItem("token")
          localStorage.setItem("timeTokenCreated", "")
          localStorage.removeItem("timeTokenCreated")
        }else{
          setUserLoggedIn(true)
        }
      }

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