import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User } from "../types"

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
      <p>Login</p>
      <form onSubmit={onSubmit}>
        <div>
          username: <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}/>
        </div>
        <div>
          password: <input type='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Login</button>
      </form>
      <br/>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default Login