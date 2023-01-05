import React, { useState, useEffect } from "react"
import logo from "../comment.png"
import { OpenTopic, TopicWithTime } from "../types"
import TopicService from "../services/TopicService"
import { useNavigate } from "react-router-dom"
import {
  H2, UpperSubContainer, Form, InputRow, ButtonRow, Button, CancelButton, ButtonToOpenForm, ButtonSmall, TableInside,
  Table, TBody, Tr, Th, TableContainer, InputTopicMessage, TopicContent,
  TdCreator, TdCount, TdTime, TdButton
} from "../styles/styles"

const Topics = () => {
  const [newTopicContent, setNewTopicContent] = useState("")
  const [topics, setTopics] = useState<OpenTopic[]>([])
  const [topicsWithTime, setTopicsWithTime] = useState<TopicWithTime[]>([])
  const [newTopicButtonClicked, setNewTopicButtonClicked] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    getAllTopics()
  }, [])

  useEffect(() => {
    setTimeToTopics()
  }, [topics])

  const getAllTopics = async() => {
    TopicService.getTopics()
      .then((response) => {
        setTopics(response.data)
      })
  }

  const setTimeToTopics = () => {
    const topicsTimed:TopicWithTime[] = []
    if(topics){
      topics.map((topic) => {
        const messagesInTopic = topic.messages
        messagesInTopic.sort((a,b) => {
          return new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime()
        })
        messagesInTopic.map((message) => {
          const datetime=new Date(message.timeCreated).setHours(new Date(message.timeCreated).getHours() + 2)
          message.timeCreated = new Date(datetime)
        })
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
        topicsTimed.push(topicWithTime)
      })
    }
    topicsTimed.sort((a,b) => {
      return new Date(b.timeToCompare).getTime() - new Date(a.timeToCompare).getTime()
    })
    setTopicsWithTime(topicsTimed)
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
      TopicService.createTopic(newTopic)
        .then((response) => {
          console.log(response.data)
          getAllTopics()
        })
    }

    setNewTopicContent("")
    setNewTopicButtonClicked(false)
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopicContent(e.currentTarget.value)
  }

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    TopicService.deleteTopic(e.currentTarget.value)
      .then((response) => {
        getAllTopics()
      })
  }

  const onClickNewTopic = () => {
    setNewTopicButtonClicked(true)
  }

  const onCancel = () => {
    setNewTopicButtonClicked(false)
  }

  return(
    <div>
      <UpperSubContainer>
        <H2>Topics</H2>
        {newTopicButtonClicked?
          <Form onSubmit={onSubmit}>
            <InputRow>
              Write a new topic: <InputTopicMessage value={newTopicContent} onChange={handleTopicChange}/>
            </InputRow>
            <ButtonRow>
              <CancelButton onClick={onCancel}>Cancel</CancelButton><Button type="submit">Save</Button>
            </ButtonRow>
          </Form>
          :<ButtonRow>
            <ButtonToOpenForm onClick={onClickNewTopic}>Write new topic</ButtonToOpenForm>
          </ButtonRow>
        }
      </UpperSubContainer>
      <TableContainer>
        <Table>
          <TBody>
            {topicsWithTime.map((topic, index) =>
              <TableInside key={index}>
                <Tr>
                  <Th>
                    <TopicContent to={`/topics/${topic.id - 1}`}>{topic.content}</TopicContent>
                  </Th>
                </Tr>
                <Tr key={index}>
                  <TdCreator>
                    by {topic.creator}
                  </TdCreator>
                  <TdCount>
                    <img src={logo} alt="Logo"/> {topic.messages.length}
                  </TdCount>
                  <TdTime>
                    {topic.time? <>latest: {topic.time.toLocaleString()}</> : ""}
                  </TdTime>
                  <TdButton>
                    {topic.messages.length===0?
                      <ButtonSmall value={topic.id} onClick={() => navigate(`/topics/update/${topic.id - 1}`)}>Modify</ButtonSmall>
                      :<></>
                    }
                  </TdButton>
                  <TdButton>
                    <ButtonSmall value={topic.id} onClick={(e) => onDelete(e)}>Delete</ButtonSmall>
                  </TdButton>
                </Tr>
              </TableInside>
            )}
          </TBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Topics