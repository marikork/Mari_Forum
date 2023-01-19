import React, { useState, useEffect } from "react"
import logo from "../utils/comment.png"
import bin from "../utils/bin.png"
import edit from "../utils/edit-button.png"
import { Message, OpenTopic, TopicWithTimeToCompare } from "../types"
import TopicService from "../services/TopicService"
import { useNavigate } from "react-router-dom"
import Confirm from "./Confirm"
import {
  H2, UpperSubContainer, Form, InputRow, ButtonRow, Button, CancelButton, ButtonToOpenForm,
  Table, TBody, Tr, Th, TableContainer, TopicContent, Textarea, TextareaModify,
  TdCreator, TdCount, TdTime, TdButton, Td, ButtonRowModify, ImageLink, ButtonRowToOpenForm
} from "../styles/styles"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

const Topics = () => {
  const [newTopicContent, setNewTopicContent] = useState("")
  const [topics, setTopics] = useState<OpenTopic[]>([])
  const [topicsWithTime, setTopicsWithTime] = useState<TopicWithTimeToCompare[]>([])
  const [newTopicButtonClicked, setNewTopicButtonClicked] = useState<boolean>(false)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<number>(-1)
  const [topicContentToModify, setTopicContentToModify] = useState("")
  const [selectedId, setSelectedId] = useState(-1)
  const [deleteClicked, setDeleteClicked] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number>()

  useEffect(() => {
    getAllTopics()
    setTimeout(() => {
      sessionStorage.setItem("user", "")
      sessionStorage.removeItem("user")
      navigate(0)
    }, 590000)
  }, [])

  useEffect(() => {
    setTimeToCompareToTopics()
  }, [topics])

  useEffect(() => {
    const button = document.getElementById("SaveButton") as HTMLButtonElement | null
    if(button && newTopicContent.length>0){
      button.disabled = false
    }
    if(button && newTopicContent.length===0){
      button.disabled = true
    }
  }, [newTopicContent])

  useEffect(() => {
    const button = document.getElementById("SaveModificationButton") as HTMLButtonElement | null
    if(button && topicContentToModify.length>0){
      button.disabled = false
    }
    if(button && topicContentToModify.length===0){
      button.disabled =true
    }
  }, [topicContentToModify])

  useEffect(() => {
    if(deleteConfirmation){
      handleDelete()
    }
  }, [deleteConfirmation])

  const getAllTopics = async() => {
    TopicService.getTopics()
      .then((response) => {
        setTopics(response.data)
      })
  }

  const setTimeToCompareToTopics = () => {
    const topicsTimed:TopicWithTimeToCompare[] = []
    if(topics){
      topics.map((topic) => {
        const messagesInTopic = topic.messages
        messagesInTopic.sort((a,b) => {
          return new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime()
        })
        messagesInTopic.map((message) => {
          const datetime=new Date(message.timeCreated).setHours(new Date(message.timeCreated).getHours())
          message.timeCreated = new Date(datetime)
        })
        let topicWithTime: TopicWithTimeToCompare
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
            time: topic.timeCreated,
            timeToCompare: topic.timeCreated
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
    const user = sessionStorage.getItem("user")
    const time = new Date()
    console.log("time on ", time)
    if(user){
      const newTopic: OpenTopic = {
        creator: user,
        content: newTopicContent,
        messages: [],
        timeCreated: time
      }
      TopicService.createTopic(newTopic)
        .then(() => {
          getAllTopics()
        })
    }
    setNewTopicContent("")
    setNewTopicButtonClicked(false)
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value.slice(0, 250)
    setNewTopicContent(text)
  }

  const onDelete = (id:number) => {
    setIdToDelete(id)
    setDeleteClicked(true)
  }

  const handleDelete = () => {
    const user = sessionStorage.getItem("user")
    if(user){
      TopicService.deleteTopic(idToDelete)
        .then(() => {
          getAllTopics()
        })

      setDeleteConfirmation(false)
      setIdToDelete(-1)
    }
  }

  const onClickNewTopic = () => {
    setNewTopicButtonClicked(true)
  }

  const onCancel = () => {
    setNewTopicContent("")
    setNewTopicButtonClicked(false)
  }

  const clickModifyHandler = (index:number, content: string, id:number) => {
    setShow(true)
    setSelected(index)
    setTopicContentToModify(content)
    setSelectedId(id)
  }

  const onSubmitModifying = () => {
    const user = sessionStorage.getItem("user")
    const messages : Message[] = []
    const time = new Date()
    if(user && topicContentToModify){
      const newTopicToUpdate: OpenTopic = {
        id: selectedId,
        creator: user,
        content: topicContentToModify,
        messages: messages,
        timeCreated: time
      }
      TopicService.updateTopic(selectedId, newTopicToUpdate)
        .then(() => {
          navigate(0)
        })
    }
  }

  const handleModifyingContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value.slice(0, 250)
    setTopicContentToModify(text)
  }

  const onCancelModifying = () => {
    setShow(false)
    setSelected(-1)
    setTopicContentToModify("")
    setSelectedId(-1)
  }

  return(
    <div>
      <UpperSubContainer onClick={onCancelModifying}>
        <H2>Topics</H2>
        {newTopicButtonClicked?
          <Form onSubmit={onSubmit}>
            <InputRow>
              Write a new topic: <Textarea value={newTopicContent} onChange={handleTopicChange}/>
            </InputRow>
            <ButtonRow>
              <CancelButton onClick={onCancel}>Cancel</CancelButton><Button type="submit" id="SaveButton" disabled>Save</Button>
            </ButtonRow>
          </Form>
          :<ButtonRowToOpenForm>
            <ButtonToOpenForm onClick={onClickNewTopic}>Write new topic</ButtonToOpenForm>
          </ButtonRowToOpenForm>
        }
      </UpperSubContainer>
      <TableContainer onClick={onCancelModifying}>
        {topicsWithTime.map((topic, index) =>
          <Table key={index} onClick={e => e.stopPropagation()}>
            {selected===index && show?
              <TBody>
                <Tr>
                  <Td>
                    <Form onSubmit={onSubmitModifying}>
                      <TextareaModify value={topicContentToModify} onChange={handleModifyingContentChange}/>
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
                  <Th colSpan={5}>
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
                    {topic.time? <> {dayjs(topic.time).fromNow(true)}</> : ""}
                  </TdTime>
                  <TdButton>
                    {topic.messages.length===0?
                      <ImageLink src={edit} alt="edit" onClick={() => clickModifyHandler(index, topic.content, topic.id)}/>
                      :<></>
                    }
                  </TdButton>
                  <TdButton>
                    <ImageLink src={bin} alt="bin" onClick={() => onDelete(topic.id)}/>
                  </TdButton>
                </Tr>
              </TBody>}
          </Table>
        )}
      </TableContainer>
      {deleteClicked?
        <Confirm setDeleteConfirmation={setDeleteConfirmation} setDeleteClicked={setDeleteClicked}/>
        :""}
    </div>
  )
}

export default Topics