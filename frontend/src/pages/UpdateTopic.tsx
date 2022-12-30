import React, { useState, useEffect } from "react"
import { OpenTopic, Message, MessageWithTopicId } from "../types"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import TopicService from "../services/TopicService"

const UpdateTopic = () => {
  const { id } =useParams()
  const [topic, setTopic] = useState<OpenTopic>()
  const navigate = useNavigate()
  const [newTopic, setNewTopic] = useState("")
  const [cancelClicked, setCancelClicked] = useState(false)

  useEffect (() => {
    console.log("UpdateTopicissa id on ", id)
    getTopic()
  }, [])

  useEffect (() => {
    if(topic){
      setNewTopic(topic.content)
    }
  }, [topic])

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(cancelClicked && topic){
      navigate(-1)
    }else{
      const user = localStorage.getItem("user")
      const time = new Date()
      const messages : Message[] = []
      if(user && newTopic){
        const newTopicToUpdate: OpenTopic = {
          id: topic?.id,
          creator: user,
          content: newTopic,
          messages: messages
        }
        //console.log(newMessageToUpdate)
        TopicService.updateTopic(newTopicToUpdate?.id, newTopicToUpdate)
          .then(() => {
            navigate(-1)
          })
      }
    }
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopic(e.currentTarget.value)
  }

  const onCancel = () => {
    setCancelClicked(true)
  }

  return(
    <div>
      <div>Update Topic here</div>

      {topic?
        <form onSubmit={onSubmit}>
          <input value={newTopic} onChange={handleTopicChange}/> <button onClick={onCancel}>Cancel</button><button type="submit">Save</button>
        </form>
        : <></>}
    </div>
  )
}

export default UpdateTopic