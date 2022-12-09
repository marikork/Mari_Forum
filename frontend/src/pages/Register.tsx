import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  H2, SubContainer, Form, InputRow, ButtonRow, Button, Input
} from "../styles/styles"

const Register = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //save user registration to database
    try{
      if ( userName !== "" &&
            password !== "" &&
            firstName !== "" &&
            lastName !== ""
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
          first name: <Input type="text" name="firstName" id="firstName" placeholder="Your First Name" onChange={event => setFirstName(event.target.value)}/>
        </InputRow>
        <InputRow>
          last name: <Input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={event => setLastName(event.target.value)}/>
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