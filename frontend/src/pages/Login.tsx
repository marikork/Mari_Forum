import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginService from "../services/LoginService"
import {
  H2, SubContainer, Form, InputRow, ButtonRow, Button, Input
} from "../styles/styles"

const Login = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(userName && password){
      console.log(userName)

      try{
        LoginService.loginUser(userName, password)
          .then((response) => {
            localStorage.setItem("user", userName)
            localStorage.setItem("token", response.data)
            const currentTime = new Date()
            localStorage.setItem("timeTokenCreated", currentTime.toString())
            navigate("/")
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
            username: <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}/>
          </InputRow>
          <InputRow>
            password: <Input type='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
          </InputRow>
          <ButtonRow>
            <Button onClick={onCancel}>Cancel</Button><Button type="submit">Login</Button>
          </ButtonRow>
        </Form>
      </SubContainer>
    </div>
  )
}

export default Login