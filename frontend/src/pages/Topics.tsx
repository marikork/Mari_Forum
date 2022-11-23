import React, { useState } from "react"
import { Link } from "react-router-dom"
import { OpenTopic } from "../types"

interface Props {
  topics: OpenTopic[],
  addNewTopic: (topic: OpenTopic) => void
}

const Topics = (props: Props) => {
  const [newTopicContent, setNewTopicContent] = useState("")

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = localStorage.getItem("user")
    if(user){
      const newTopic: OpenTopic = {
        creator: user,
        content: newTopicContent
      }
      props.addNewTopic(newTopic)
    }

    setNewTopicContent("")
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopicContent(e.currentTarget.value)
  }

  return(
    <div>
      <p>Topics</p>
      <form onSubmit={onSubmit}>
        <div>
          Write a new topic: <input
            value={newTopicContent}
            onChange={handleTopicChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <ul>
        {props.topics.map((topic, index) =>
          <li key={index}>
            <Link to={`/topics/${index}`}>{topic.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Topics