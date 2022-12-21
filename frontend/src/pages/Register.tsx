import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  H2, SubContainer, Form, InputRow, ButtonRow, Button, Input
} from "../styles/styles"

const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //save user registration to database
    try{
      if ( userName !== "" &&
            password !== "" &&
            email !== ""
      ) {
        console.log("on kaikki")
      }
    }catch(error){
      console.log("error in submitting")
    }


    console.log(event)
    navigate("/")
  }

  const onCancel = () => {
    navigate("/")
  }

  return(
    <SubContainer>
      <H2>Register</H2>
      <Form onSubmit={onSubmit}>
        <InputRow>
          email:   <Input type="text" name="email" id="email" placeholder="Your Email" onChange={event => setEmail(event.target.value)}/>
        </InputRow>
        <InputRow>
          username: <Input type="text" name="userName" id="userName" placeholder="Your Username" onChange={event => setUserName(event.target.value)}/>
        </InputRow>
        <InputRow>
          password: <Input type='password' name="password" id="password" placeholder="Your Password" onChange={event => setPassword(event.target.value)}/>
        </InputRow>
        <ButtonRow>
          <Button onClick={onCancel}>Cancel</Button><Button type="submit">Register</Button>
        </ButtonRow>
      </Form>
    </SubContainer>
  )
}

export default Register