import { User } from "../types"
import axios from "axios"
const api = axios.create({
  baseURL: "http://localhost:8080/"
})

const loginUser = (email: string, password: string) => {
  return api.post<string>("/login", { email, password })
}

const logoutUser = (token: string) => {
  return api.post("/logout", { token })
}

const LoginService = {
  loginUser,
  logoutUser
}

export default LoginService