import React from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //save user registration to database

    console.log(event)
    navigate("/")
  }

  const onCancel = () => {
    navigate("/")
  }

  return(
    <div>
      <p>Register</p>
      <form onSubmit={onSubmit}>
        <div>
          your name: <input />
        </div>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">Register</button>
      </form>
      <br/>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default Register