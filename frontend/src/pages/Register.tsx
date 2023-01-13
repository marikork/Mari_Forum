import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  H2, SubContainer, Form, InputRow, ButtonRow, Button, CancelButton, Input, InfoTextShort
} from "../styles/styles"

const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()

  useEffect(() => {
    const button = document.getElementById("SaveButton") as HTMLButtonElement | null
    if(button && email.length>0 && userName.length>0 && password.length>0){
      button.disabled = false
    }
    if((button && email.length===0) || (button && userName.length===0) || (button && password.length>0)){
      button.disabled = true
    }
  }, [userName, password])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try{
      if ( userName !== "" &&
            password !== "" &&
            email !== ""
      ) {
        //saving user registration to database is not implemented yet
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return(
    <SubContainer>
      <H2>Register</H2>
      <Form onSubmit={onSubmit}>
        <InputRow>
          <InfoTextShort>email:</InfoTextShort><Input type="text" name="email" id="email" placeholder="Your Email" onChange={handleEmailChange}/>
        </InputRow>
        <InputRow>
          <InfoTextShort>username:</InfoTextShort><Input type="text" name="userName" id="userName" placeholder="Your Username" onChange={handleUserNameChange}/>
        </InputRow>
        <InputRow>
          <InfoTextShort>password:</InfoTextShort><Input type='password' name="password" id="password" placeholder="Your Password" onChange={handlePasswordChange}/>
        </InputRow>
        <ButtonRow>
          <CancelButton onClick={onCancel}>Cancel</CancelButton><Button type="submit" id="SaveButton" disabled>Register</Button>
        </ButtonRow>
      </Form>
    </SubContainer>
  )
}

export default Register