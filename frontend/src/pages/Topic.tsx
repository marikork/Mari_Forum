import React, { useState, useEffect } from "react"
import { OpenTopic } from "../types"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

interface Props {
  topics: OpenTopic[]
}

const Topic = (props: Props) => {
  const { id } =useParams()
  const [paramsAsNumber, setParamsAsNumber] = useState(0)
  const navigate = useNavigate()

  useEffect (() => {
    let num: number
    if(id){
      num=parseInt(id)
      setParamsAsNumber(num)
    }
  }, [])

  const onBack = () => {
    navigate("/")
  }

  return(
    <div>
      <button onClick={onBack}>Back</button>
      {id?
        <p>{props.topics[paramsAsNumber].content}</p>
        :""}
    </div>
  )
}

export default Topic