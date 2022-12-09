import React, { useState, useEffect } from "react"
import { OpenTopic, Message } from "../types"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import TopicService from "../services/TopicService"
import {
  H2, SubContainer, Form, TextRow, ButtonRow, Button, Input, MessageRow, ContentRow, Table, TBody, Tr, Th, Td, MessagesTableContainer
} from "../styles/styles"

//interface Props {
//  topics: OpenTopic[]
//}

const Topic = () => {
  const { id } =useParams()
  const [topic, setTopic] = useState<OpenTopic>()
  const navigate = useNavigate()
  const [newMessageContent, setNewMessageContent] = useState("")
  const [Messages, setMessages] = useState<Message[]>([{ writer:"user1", message:"message here" }, { writer: "user2", message: "some message here" }])

  useEffect (() => {
    //let num: number
    //if(id){
    //  num=parseInt(id)
    //}
    getTopic()
  }, [])

  const getTopic = async() => {
    let idToNumber = Number(id)
    idToNumber++
    if(id){
      TopicService.getTopic(idToNumber)
        .then(response => {
          console.log(response.data)
          setTopic(response.data)
        })
    }

  }

  const onBack = () => {
    navigate("/")
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = localStorage.getItem("user")
    /*
    if(user){
      const newTopic: OpenTopic = {
        creator: user,
        content: newMessageContent
      }
      //props.addNewTopic(newTopic)
      console.log(newTopic)
      TopicService.createTopic(newTopic)
        .then((response) => {
          console.log(response.data)
          getAllTopics()
        })
    }*/

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
                {Messages.map((message, index) =>
                  <Tr key={index}>
                    <Td>
                      {message.writer}:
                    </Td>
                    <Td>
                      {message.message}
                    </Td>
                  </Tr>
                )}
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