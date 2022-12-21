import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { OpenTopic } from "../types"
import TopicService from "../services/TopicService"
import {
  H2, SubContainer, Form, InputRow, ButtonRow, Button, Input, Table, TBody, Tr, Th, Td, TableContainer
} from "../styles/styles"

const Topics = () => {
  const [newTopicContent, setNewTopicContent] = useState("")
  const [topics, setTopics] = useState<OpenTopic[]>([])

  useEffect(() => {
    getAllTopics()
  }, [])

  const getAllTopics = async() => {
    TopicService.getTopics()
      .then((response) => {
        console.log(response.data)
        setTopics(response.data)
      })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = localStorage.getItem("user")
    if(user){
      const newTopic: OpenTopic = {
        creator: user,
        content: newTopicContent,
        messages: 0
      }
      //props.addNewTopic(newTopic)
      console.log(newTopic)
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
            </Tr>
            {topics.map((topic, index) =>
              <Tr key={index}>
                <Td>
                  {topic.creator}
                </Td>
                <Td>
                  <Link to={`/topics/${index}`}>{topic.content}</Link>
                </Td>
                <Td>
                  {topic.messages}
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