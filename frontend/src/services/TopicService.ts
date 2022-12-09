import { OpenTopic } from "../types"
import axios from "axios"
const api = axios.create({
  baseURL: "http://localhost:8080/"
})

const getTopics = () => {
  return api.get<Array<OpenTopic>>("/topics")
}

const getTopic = (id: any) => {
  return api.get<OpenTopic>(`/topics/${id}`)
}

const createTopic = (data: OpenTopic) => {
  return api.post<OpenTopic>("/topics", data)
}

const TopicService = {
  getTopics,
  getTopic,
  createTopic
}

export default TopicService