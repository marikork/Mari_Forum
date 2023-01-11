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
    const button = document.getElementById("SaveButton") as HTMLButtonElement | null
    if(button && userName.length>0 && password.length>0){
      button.disabled= false
    }
  }, [userName, password])

  const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(userName && password){
      try{
        LoginService.loginUser(userName, password)
          .then((response) => {
            localStorage.setItem("user", userName)
            localStorage.setItem("token", response.data)
            const currentTime = new Date()
            localStorage.setItem("timeTokenCreated", currentTime.toString())
            navigate(-1)
          })
      }catch(error){
        console.log(error)
      }
    }
  }

  const onCancel = () => {
    navigate("/")
  }

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return(
    <div>
      <SubContainer>
        <H2>Login</H2>
        <Form onSubmit={onSubmit}>
          <InputRow>
            <InfoTextShort>username:</InfoTextShort><Input onChange={handleUserNameChange}/>
          </InputRow>
          <InputRow>
            <InfoTextShort>password:</InfoTextShort><Input type='password' onChange={handlePasswordChange}/>
          </InputRow>
          <ButtonRow>
            <CancelButton onClick={onCancel}>Cancel</CancelButton><Button type="submit" id="SaveButton" disabled>Login</Button>
          </ButtonRow>
        </Form>
      </SubContainer>
    </div>
  )
}

export default Login