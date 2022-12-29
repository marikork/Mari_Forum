import { OpenTopic, Message, MessageWithTopicId } from "../types"
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

const getMessages = (id: any) => {
  return api.get<Array<Message>>(`/topics/${id}/messages`, id)
}

const createTopic = (data: OpenTopic) => {
  return api.post<OpenTopic>("/topics", data)
}

const createMessage = (id: number, data: Message) => {
  return api.post<Message>(`/topics/${id}/messages`, data)
}

const updateMessages = (id: number, data: MessageWithTopicId) => {
  return api.put<Message>(`/messages/${id}`, data)
}

const deleteTopic = (id: any) => {
  console.log("deleteTopicissa ", id, typeof(id))
  return api.delete(`/topics/${id}`)
}

const TopicService = {
  getTopics,
  getTopic,
  createTopic,
  getMessages,
  createMessage,
  updateMessages,
  deleteTopic
}

export default TopicService