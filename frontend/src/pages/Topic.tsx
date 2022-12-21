import React, { useState, useEffect } from "react"
import { OpenTopic, Message } from "../types"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import TopicService from "../services/TopicService"
import {
  SubContainer, Form, TextRow, ButtonRow, Button, Input, MessageRow, ContentRow, Table, TBody, Tr, Td, MessagesTableContainer
} from "../styles/styles"

const Topic = () => {
  const { id } =useParams()
  const [topic, setTopic] = useState<OpenTopic>()
  const navigate = useNavigate()
  const [newMessageContent, setNewMessageContent] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  useEffect (() => {
    getTopic()
    getMessages()
  }, [])

  const getTopic = async() => {
    let idToNumber = Number(id)
    idToNumber++
    if(id){
      TopicService.getTopic(idToNumber)
        .then(response => {
          setTopic(response.data)
        })
    }
  }

  const getMessages = async() => {
    let idToNumber = Number(id)
    idToNumber++
    if(id){
      TopicService.getMessages(idToNumber)
        .then(response => {
          console.log(response.data)
          setMessages(response.data)
        })
    }
  }

  const onBack = () => {
    navigate("/")
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = localStorage.getItem("user")
    let idToNumber = Number(id)
    idToNumber++
    if(user){
      const newMessage: Message = {
        writer: user,
        message: newMessageContent,
        topic: null
      }
      TopicService.createMessage(idToNumber, newMessage)
        .then((response) => {
          console.log(response.data)
          getMessages()
        })
    }
    setNewMessageContent("")
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageContent(e.currentTarget.value)
  }

  return(
    <SubContainer>
      <ButtonRow>
        <Button onClick={onBack}>Back</Button>
      </ButtonRow>
      {id?
        <>
          <TextRow>{topic?.creator} wrote:</TextRow>
          <ContentRow>{topic?.content}</ContentRow>
          <MessagesTableContainer>
            <Table>
              <TBody>
                {messages?
                  messages.map((message, index) =>
                    <Tr key={index}>
                      <Td>
                        {message.writer}:
                      </Td>
                      <Td>
                        {message.message}
                      </Td>
                    </Tr>
                  ):""
                }
              </TBody>
            </Table>
          </MessagesTableContainer>
          <Form onSubmit={onSubmit}>
            <MessageRow>
              New message: <Input value={newMessageContent} onChange={handleMessageChange}/>
            </MessageRow>
            <ButtonRow>
              <Button type="submit">Save</Button>
            </ButtonRow>
          </Form>
        </>
        :""}
    </SubContainer>
  )
}

export default Topic