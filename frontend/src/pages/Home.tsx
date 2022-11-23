import React, { useState } from "react"
import Topics from "./Topics"
import { Link } from "react-router-dom"
import { OpenTopic } from "../types"

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
          <button onClick={onLogoutClick}>Logout</button>
          <Topics topics={topics} addNewTopic={addNewTopic}/>
        </>
        :
        <>
          <Link to="/login">Login</Link>
          <br/>
          <Link to="/register">Register</Link>
        </>
      }

    </div>
  )
}

export default Home
