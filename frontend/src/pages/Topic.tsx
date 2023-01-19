import React, { useState, useEffect } from "react"
import { OpenTopic, Message, MessageWithTopicId } from "../types"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import TopicService from "../services/TopicService"
import edit from "../utils/edit-button.png"
import {
  UpperSubContainer, Form, TextRow, ButtonRow, Button, CancelButton, ButtonToOpenForm, InputRow,
  ContentRow, TBody, Tr, Td, TableContainer, ButtonRowModify, ImageLink, Textarea, TextareaModify,
  TdWriter, TdButton, TdMessageTime, ThMessage, TableMessages, ButtonRowToOpenForm
} from "../styles/styles"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

const Topic = () => {
  const { id } =useParams()
  const [topic, setTopic] = useState<OpenTopic>()
  const navigate = useNavigate()
  const [newMessageContent, setNewMessageContent] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessageButtonClicked, setNewMessageButtonClicked] = useState<boolean>(false)
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<number>(-1)
  const [messageToModify, setMessageToModify] = useState("")

  useEffect (() => {
    getTopic()
    getMessages()
    const user = sessionStorage.getItem("user")
    if(!user){
      navigate(-1)
    }
  }, [])

  useEffect(() => {
    const button = document.getElementById("SaveButton") as HTMLButtonElement | null
    if(button && newMessageContent.length>0){
      button.disabled = false
    }
    if(button && newMessageContent.length===0){
      button.disabled = true
    }
  }, [newMessageContent])

  useEffect(() => {
    const button = document.getElementById("SaveModificationButton") as HTMLButtonElement | null
    if(button && messageToModify.length>0){
      button.disabled = false
    }
    if(button && messageToModify.length===0){
      button.disabled =true
    }
  }, [messageToModify])

  const getTopic = async() => {
    let idToNumber = Number(id)
    idToNumber++
    const user = sessionStorage.getItem("user")
    if(id && user){
      TopicService.getTopic(idToNumber)
        .then(response => {
          setTopic(response.data)
        })
    }
  }

  const getMessages = async() => {
    let idToNumber = Number(id)
    idToNumber++
    const user = sessionStorage.getItem("user")
    if(id && user){
      TopicService.getMessages(idToNumber)
        .then(response => {
          const arrFromDB = response.data
          arrFromDB.sort((a,b) => {
            return new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime()
          })
          arrFromDB.map((message) => {
            const datetime=new Date(message.timeCreated).setHours(new Date(message.timeCreated).getHours())
            message.timeCreated = new Date(datetime)
          })
          setMessages(arrFromDB)
        })
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = sessionStorage.getItem("user")
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

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value.slice(0, 250)
    setNewMessageContent(text)
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
    const user = sessionStorage.getItem("user")
    const time = new Date()
    if(user && messageToModify && topic){
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

  const handleModifyingMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value.slice(0, 250)
    setMessageToModify(text)
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
                New message: <Textarea value={newMessageContent} onChange={handleMessageChange}/>
                </InputRow>
                <ButtonRow>
                  <CancelButton onClick={onCancel}>Cancel</CancelButton><Button type="submit" id="SaveButton" disabled>Save</Button>
                </ButtonRow>
              </Form>
              :<ButtonRowToOpenForm>
                <ButtonToOpenForm onClick={onClickNewMessage}>Write new message</ButtonToOpenForm>
              </ButtonRowToOpenForm>}
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
                            <TextareaModify value={messageToModify} onChange={handleModifyingMessageChange}/>
                            <ButtonRowModify>
                              <Button type="submit" id="SaveModificationButton" disabled>Save</Button>
                            </ButtonRowModify>
                          </Form>
                        </Td>
                      </Tr>
                    </TBody>
                    :
                    <TBody>
                      <Tr>
                        <ThMessage colSpan={3}>
                          {message.message}
                        </ThMessage>
                      </Tr>
                      <Tr>
                        <TdWriter>
                              by {message.writer}
                        </TdWriter>
                        <TdMessageTime>
                          <>{dayjs(message.timeCreated).fromNow(true)}</>
                        </TdMessageTime>
                        <TdButton>
                          <ImageLink src={edit} alt="edit" onClick={() => clickModifyHandler(index, message.message)}/>
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