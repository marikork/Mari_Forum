import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User } from "../types"
import {
  H2, SubContainer, Form, InputRow, ButtonRow, Button, Input
} from "../styles/styles"

interface Props {
  onLogin: () => void
}
const Login = ({ onLogin }: Props) => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(userName){
      console.log(userName)
    }

    //const userName = event.currentTarget.elements[0].toString()
    onLogin()
    localStorage.setItem("user", userName)
    navigate("/")
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