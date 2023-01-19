import React, { useState, useEffect } from "react"
import Topics from "./Topics"
import {
  H2, WelcomeContainer, LinkRow, Button, InfoText
} from "../styles/styles"

const Home = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    if(sessionStorage.getItem("user")){
      setUserLoggedIn(true)
    }else{
      setUserLoggedIn(false)
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