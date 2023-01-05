import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginService from "../services/LoginService"
import {
  H2, SubContainer, Form, InputRow, ButtonRow, Button, CancelButton, Input, InfoTextShort
} from "../styles/styles"

const Login = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  useEffect(() => {
    console.log("Login, useEffect")
  }, [])

  const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Login, onSubmitin alussa")

    if(userName && password){
      console.log("Login, username on ",userName)

      try{
        LoginService.loginUser(userName, password)
          .then((response) => {
            localStorage.setItem("user", userName)
            localStorage.setItem("token", response.data)
            const currentTime = new Date()
            localStorage.setItem("timeTokenCreated", currentTime.toString())
            navigate(-1)//("/")
          })
      }catch(error){
        console.log(error)
      }
    }
  }

  const onCancel = () => {
    navigate("/")
  }

  return(
    <div>
      <SubContainer>
        <H2>Login</H2>
        <Form onSubmit={onSubmit}>
          <InputRow>
            <InfoTextShort>username:</InfoTextShort><Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}/>
          </InputRow>
          <InputRow>
            <InfoTextShort>password:</InfoTextShort><Input type='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
          </InputRow>
          <ButtonRow>
            <CancelButton onClick={onCancel}>Cancel</CancelButton><Button type="submit">Login</Button>
          </ButtonRow>
        </Form>
      </SubContainer>
    </div>
  )
}

export default Login