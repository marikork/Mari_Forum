import React, { useState, useEffect } from "react"
import Topics from "./Topics"
import { useNavigate } from "react-router-dom"
import {
  H2, WelcomeContainer, LinkRow, Button, ButtonRow, SubContainer, InfoText
} from "../styles/styles"

const Home = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const navigate = useNavigate()

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
          navigate(0)
        }else{
          setUserLoggedIn(true)
        }
      }

    }
  }, [])


  return(
    <div>
      {userLoggedIn?
        <>
          <Topics/>
        </>
        :
        <>
          <WelcomeContainer>
            <H2>Welcome to discuss</H2>
            <LinkRow><InfoText>Login to your account: </InfoText><a href="/login"><Button>Login</Button></a></LinkRow>
            <LinkRow><InfoText>Create a new account: </InfoText><a href="/register"><Button>Register</Button></a></LinkRow>
          </WelcomeContainer>
        </>
      }

    </div>
  )
}

export default Home