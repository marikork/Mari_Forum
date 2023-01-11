import React, { useState, useEffect } from "react"
import { OpenTopic, Message, MessageWithTopicId } from "../types"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import TopicService from "../services/TopicService"
import {
  UpperSubContainer, Form, TextRow, ButtonRow, Button, CancelButton, ButtonToOpenForm, InputRow,
  ContentRow, TBody, Tr, Td, InputTopicMessage, TableContainer, ButtonRowModify,
  TdWriter, TdButton, ButtonSmall, TdMessageTime, ThMessage, InputModifyMessage, SaveButton, TableMessages
} from "../styles/styles"

const Topic = () => {
  const { id } =useParams()
  const [topic, setTopic] = useState<OpenTopic>()
  const navigate = useNavigate()
  const [newMessageContent, setNewMessageContent] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState("")
  const [newMessageButtonClicked, setNewMessageButtonClicked] = useState<boolean>(false)
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<number>(-1)
  const [messageToModify, setMessageToModify] = useState("")

  useEffect (() => {
    getTopic()
    getMessages()
    const currentUser = localStorage.getItem("user")
    if(currentUser){
      setUser(currentUser)
    }
  }, [])

  useEffect(() => {
    const button = document.getElementById("SaveButton") as HTMLButtonElement | null
    if(button && newMessageContent.length>0){
      button.disabled= false
    }
  }, [newMessageContent])

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
    setNewMessageContent("")
    setNewMessageButtonClicked(false)
  }

  const onCancelModifying = () => {
    setShow(false)
    setSelected(-1)
    setMessageToModify("")
  }

  const onSubmitModifying = () => {
    const user = localStorage.getItem("user")
    const time = new Date()
    if(user&&messageToModify&&topic){
      const newMessageToUpdate: MessageWithTopicId = {
        id: messages[selected].id,
        writer: user,
        message: messageToModify,
        topic: topic.id,
        timeCreated: time
      }
      TopicService.updateMessages(messages[selected].id, newMessageToUpdate)
        .then(() => {
          navigate(0)
        })
    }
  }

  const handleModifyingMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageToModify(e.currentTarget.value)
  }

  const clickModifyHandler = (index:number, message: string) => {
    setShow(true)
    setSelected(index)
    setMessageToModify(message)
  }

  return(
    <>
      {id?
        <>
          <UpperSubContainer onClick={onCancelModifying}>
            <TextRow>{topic?.creator} wrote:</TextRow>
            <ContentRow>{topic?.content}</ContentRow>
            {newMessageButtonClicked?
              <Form onSubmit={onSubmit}>
                <InputRow>
                New message: <InputTopicMessage value={newMessageContent} onChange={handleMessageChange}/>
                </InputRow>
                <ButtonRow>
                  <CancelButton onClick={onCancel}>Cancel</CancelButton><Button type="submit" id="SaveButton" disabled>Save</Button>
                </ButtonRow>
              </Form>
              :<ButtonRow>
                <ButtonToOpenForm onClick={onClickNewMessage}>Write new message</ButtonToOpenForm>
              </ButtonRow>}
          </UpperSubContainer>
          <TableContainer onClick={onCancelModifying}>
            {messages&&topic?
              messages.map((message, index) =>
                <TableMessages key={index} onClick={e => e.stopPropagation()}>
                  {selected===index && show?
                    <TBody>
                      <Tr>
                        <Td>
                          <Form onSubmit={onSubmitModifying}>
                            <InputModifyMessage value={messageToModify} onChange={handleModifyingMessageChange}/>
                            <ButtonRowModify>
                              <SaveButton><ButtonSmall type="submit">Save</ButtonSmall></SaveButton>
                            </ButtonRowModify>
                          </Form>
                        </Td>
                      </Tr>
                    </TBody>
                    :
                    <TBody>
                      <Tr>
                        <ThMessage>
                          {message.message}
                        </ThMessage>
                      </Tr>
                      <Tr>
                        <TdWriter>
                              by {message.writer}
                        </TdWriter>
                        <TdMessageTime>
                          on <>{message.timeCreated.toLocaleDateString()} {message.timeCreated.getHours()}:{message.timeCreated.getMinutes()}</>
                        </TdMessageTime>
                        <TdButton>
                          <ButtonSmall id={index.toString()} onClick={() => clickModifyHandler(index, message.message)}>Modify</ButtonSmall>
                        </TdButton>
                      </Tr>
                    </TBody>}
                </TableMessages>
              ):<></>
            }
          </TableContainer>
        </>
        :""}
    </>
  )
}

export default Topic