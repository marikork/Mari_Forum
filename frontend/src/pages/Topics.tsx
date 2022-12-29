import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { OpenTopic, TopicWithTime } from "../types"
import TopicService from "../services/TopicService"
import {
  H2, SubContainer, Form, InputRow, ButtonRow, Button, Input, Table, TBody, Tr, Th, Td, TableContainer
} from "../styles/styles"

const Topics = () => {
  const [newTopicContent, setNewTopicContent] = useState("")
  const [topics, setTopics] = useState<OpenTopic[]>([])
  const [topicsWithTime, setTopicsWithTime] = useState<TopicWithTime[]>([])

  useEffect(() => {
    getAllTopics()
  }, [])

  useEffect(() => {
    setTimeToTopics()
  }, [topics])

  const getAllTopics = async() => {
    TopicService.getTopics()
      .then((response) => {
        //console.log(response.data)
        setTopics(response.data)
      })
  }

  const setTimeToTopics = () => {
    const topicsTimed:TopicWithTime[] = []
    if(topics){
      topics.map((topic) => {
        //console.log(topic)
        const messagesInTopic = topic.messages
        messagesInTopic.sort((a,b) => {
          return new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime()
        })
        messagesInTopic.map((message) => {
          const datetime=new Date(message.timeCreated).setHours(new Date(message.timeCreated).getHours() + 2)
          message.timeCreated = new Date(datetime)
        })
        //console.log(messagesInTopic)
        let topicWithTime: TopicWithTime
        if(messagesInTopic[0]){
          topicWithTime = {
            id: topic.id,
            creator: topic.creator,
            content: topic.content,
            messages: topic.messages,
            time: messagesInTopic[0].timeCreated,
            timeToCompare: messagesInTopic[0].timeCreated,
          }
        }else{
          topicWithTime = {
            id: topic.id,
            creator: topic.creator,
            content: topic.content,
            messages: topic.messages,
            time: null,
            timeToCompare: new Date()
          }
        }
        //console.log(topicWithTime)
        topicsTimed.push(topicWithTime)
        //console.log(topicsTimed)
      })
    }
    topicsTimed.sort((a,b) => {
      return new Date(b.timeToCompare).getTime() - new Date(a.timeToCompare).getTime()
    })
    //console.log(topicsTimed)
    setTopicsWithTime(topicsTimed)
    //console.log(topicsWithTime)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = localStorage.getItem("user")
    if(user){
      const newTopic: OpenTopic = {
        creator: user,
        content: newTopicContent,
        messages: []
      }
      //console.log(newTopic)
      TopicService.createTopic(newTopic)
        .then((response) => {
          console.log(response.data)
          getAllTopics()
        })
    }

    setNewTopicContent("")
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopicContent(e.currentTarget.value)
  }

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log("deletessä, ",e.currentTarget.value)
    TopicService.deleteTopic(e.currentTarget.value)
      .then((response) => {
        getAllTopics()
      })
  }

  return(
    <div>
      <SubContainer>
        <H2>Topics</H2>
        <Form onSubmit={onSubmit}>
          <InputRow>
            Write a new topic: <Input value={newTopicContent} onChange={handleTopicChange}/>
          </InputRow>
          <ButtonRow>
            <Button type="submit">Save</Button>
          </ButtonRow>
        </Form>
      </SubContainer>
      <TableContainer>
        <Table>
          <TBody>
            <Tr>
              <Th>Creator</Th>
              <Th>Topic</Th>
              <Th>Messages</Th>
              <Th>Latest</Th>
            </Tr>
            {topicsWithTime.map((topic, index) =>
              <Tr key={index}>
                <Td>
                  {topic.creator}
                </Td>
                <Td>
                  <Link to={`/topics/${topic.id - 1}`}>{topic.content}</Link>
                </Td>
                <Td>
                  {topic.messages.length}
                </Td>
                <Td>
                  {topic.time? topic.time.toLocaleString() : ""}
                </Td>
                <Td>
                  <Button value={topic.id} onClick={(e) => onDelete(e)}>Delete</Button>
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Topics