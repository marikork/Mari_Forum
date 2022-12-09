import React, { useState } from "react"
import Topics from "./Topics"
import { OpenTopic } from "../types"
import {
  H2, WelcomeContainer, LinkRow, Button, ButtonRow, SubContainer
} from "../styles/styles"

interface Props {
  currentUser: boolean,
  onLogout: () => void,
  topics: OpenTopic[],
  addNewTopic: (topic: OpenTopic) => void
}

const Home = ({ currentUser, onLogout, topics, addNewTopic }: Props) => {

  const onLogoutClick = () => {
    onLogout()
    localStorage.setItem("user", "")
  }
  return(
    <div>
      {currentUser?
        <>
          <SubContainer>
            <ButtonRow>
              <Button onClick={onLogoutClick}>Logout</Button>
            </ButtonRow>
          </SubContainer>
          <Topics topics={topics} addNewTopic={addNewTopic}/>
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