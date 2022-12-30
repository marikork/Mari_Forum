import React, { useState, useEffect } from "react"
import { OpenTopic, Message, MessageWithTopicId } from "../types"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import TopicService from "../services/TopicService"

const UpdateMessage = () => {
  const { id, index } =useParams()
  const [topic, setTopic] = useState<OpenTopic>()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [messageToUpdate, setMessageToUpdate] = useState<Message>()
  const [newMessage, setNewMessage] = useState("")
  const [cancelClicked, setCancelClicked] = useState(false)

  useEffect (() => {
    getTopic()
    getMessages()
  }, [])

  useEffect (() => {
    const indexToNumber = Number(index)
    setMessageToUpdate(messages[indexToNumber])
  }, [messages])

  useEffect (() => {
    if(messageToUpdate){
      //console.log(messageToUpdate)
      setNewMessage(messageToUpdate.message)
    }
  }, [messages, messageToUpdate])

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
    if(cancelClicked && topic){
      navigate(`/topics/${topic.id - 1}`)
    }else{
      const user = localStorage.getItem("user")
      const time = new Date()
      if(user&&newMessage&&topic){
        const newMessageToUpdate: MessageWithTopicId = {
          id: messageToUpdate?.id,
          writer: user,
          message: newMessage,
          topic: topic.id,
          timeCreated: time
        }
        TopicService.updateMessages(messageToUpdate?.id, newMessageToUpdate)
          .then(() => {
            navigate(-1)
          })
      }
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.currentTarget.value)
  }

  const onCancel = () => {
    setCancelClicked(true)
  }


  return(
    <div>
      <div>Update Message here</div>

      {newMessage?
        <form onSubmit={onSubmit}>
          <input value={newMessage} onChange={handleMessageChange}/> <button onClick={onCancel}>Cancel</button><button type="submit">Save</button>
        </form>
        : <></>}
    </div>
  )
}

export default UpdateMessage