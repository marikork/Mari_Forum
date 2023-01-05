import React, { useState, useEffect } from "react"
import { OpenTopic, Message } from "../types"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import TopicService from "../services/TopicService"
import {
  SubContainer, UpperSubContainer, Form, TextRow, ButtonRow, Button, CancelButton, ButtonToOpenForm, Input, InputRow,
  MessageRow, ContentRow, Table, TBody, Tr, Td, MessagesTableContainer, InputTopicMessage, TableContainer, TableInside,
  TdWriter, TdTime, TdButton, ButtonSmall, TdMessageTime, ThMessage
} from "../styles/styles"

const Topic = () => {
  const { id } =useParams()
  const [topic, setTopic] = useState<OpenTopic>()
  const navigate = useNavigate()
  const [newMessageContent, setNewMessageContent] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState("")
  const [newMessageButtonClicked, setNewMessageButtonClicked] = useState<boolean>(false)

  useEffect (() => {
    getTopic()
    getMessages()
    const currentUser = localStorage.getItem("user")
    if(currentUser){
      setUser(currentUser)
    }
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
          const arrFromDB = response.data
          arrFromDB.sort((a,b) => {
            return new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime()
          })
          arrFromDB.map((message) => {
            const datetime=new Date(message.timeCreated).setHours(new Date(message.timeCreated).getHours() + 2)
            message.timeCreated = new Date(datetime)
          })
          setMessages(arrFromDB)
        })
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = localStorage.getItem("user")
    let idToNumber = Number(id)
    idToNumber++
    const time = new Date()
    if(user){
      const newMessage: Message = {
        writer: user,
        message: newMessageContent,
        topic: null,
        timeCreated: time
      }
      TopicService.createMessage(idToNumber, newMessage)
        .then((response) => {
          console.log(response.data)
          getMessages()
        })
    }
    setNewMessageContent("")
    setNewMessageButtonClicked(false)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageContent(e.currentTarget.value)
  }

  const onClickNewMessage = () => {
    setNewMessageButtonClicked(true)
  }

  const onCancel = () => {
    setNewMessageButtonClicked(false)
  }

  return(
    <>
      {id?
        <>
          <UpperSubContainer>
            <TextRow>{topic?.creator} wrote:</TextRow>
            <ContentRow>{topic?.content}</ContentRow>
            {newMessageButtonClicked?
              <Form onSubmit={onSubmit}>
                <InputRow>
                New message: <InputTopicMessage value={newMessageContent} onChange={handleMessageChange}/>
                </InputRow>
                <ButtonRow>
                  <CancelButton onClick={onCancel}>Cancel</CancelButton><Button type="submit">Save</Button>
                </ButtonRow>
              </Form>
              :<ButtonRow>
                <ButtonToOpenForm onClick={onClickNewMessage}>Write new message</ButtonToOpenForm>
              </ButtonRow>}
          </UpperSubContainer>
          <TableContainer>
            <Table>
              <TBody>
                {messages&&topic?
                  messages.map((message, index) =>
                    <TableInside key={index}>
                      <Tr>
                        <ThMessage>
                          {message.message}
                        </ThMessage>
                      </Tr>
                      <Tr key={index}>
                        <TdWriter>
                          by {message.writer}
                        </TdWriter>
                        <TdMessageTime>
                          on {message.timeCreated.toLocaleString()}
                        </TdMessageTime>
                        <TdButton>
                          {user===message.writer?
                            <ButtonSmall value={index} onClick={() => navigate(`/topics/${topic.id - 1}/${index}`)}>Update</ButtonSmall>
                            :<></>}
                        </TdButton>
                      </Tr>
                    </TableInside>
                  ):<></>
                }
              </TBody>
            </Table>
          </TableContainer>
        </>
        :""}
    </>
  )
}

export default Topic
/**
 * <TableContainer>
            <Table>
              <TBody>
                {messages&&topic?
                  messages.map((message, index) =>
                    <Tr key={index}>
                      <Td>
                        {message.writer}:
                      </Td>
                      <Td>
                        {message.message}
                      </Td>
                      <Td>
                        {message.timeCreated.toLocaleString()}
                      </Td>
                      {user===message.writer?
                        <Td>
                          <Button value={index} onClick={() => navigate(`/topics/${topic.id - 1}/${index}`)}>Update</Button>
                        </Td>
                        :<></>}
                    </Tr>
                  ):<></>
                }
              </TBody>
            </Table>
          </TableContainer>
 */
/**
 * <Tr>
                        <ThMessage>
                          {message.message}
                        </ThMessage>
                      </Tr>
 */