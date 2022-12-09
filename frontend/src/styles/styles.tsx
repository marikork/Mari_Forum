import styled from "styled-components"
import { Link } from "react-router-dom"

export const Button = styled.button`
  font-family: Roboto !important;
  font-size: 15px;
  margin-left: 5%;
  width: 80px;
  height: 25px;
  background: transparent;
  border-radius: 5px;
`
export const LoginLink = styled(Link)`
  font-family: Roboto;
  font-size: 14px;
  text-decoration:none;
  color: black;
  border-style: solid;
  margin-left: 10px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
`

export const H1 = styled.h1`
  font-family: Roboto;
  font-size: 32px;
  @media (max-width: 768px) {
    margin-left: 2%;
  }
`

export const Form = styled.form`
  
`

export const Input = styled.input`
  width: 280px;
  margin-left: 5%;
`

export const H2 = styled.h2`
  font-family: Roboto;
  font-size: 24px;
  padding-left: 10px;
`

export const LinkRow = styled.div`
  margin-left: 15%;
  margin-bottom: 3%;
  display: flex;
  justify-content: left;
`

export const InputRow = styled.div`
  margin-left: 5%;
  margin-bottom: 3%;
  display: flex;
  justify-content: left;
`

export const MessageRow = styled.div`
  margin-left: 0%;
  margin-bottom: 3%;
  display: flex;
  justify-content: left;
`

export const TextRow = styled.p`
  display: flex;
  justify-content: left;
`

export const ContentRow = styled.p`
  display: flex;
  justify-content: left;
  font-weight: bold;
`

export const ButtonRow = styled.div`
  margin-left: 15%;
  margin-right: 5%;
  margin-bottom: 3%;
  display: flex;
  justify-content: right;
`

export const Table = styled.table`
  background-color: white;
  width: 100%;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export const TBody = styled.tbody`
  background-color: white;
`

export const Tr = styled.tr`
  background-color: white;
  padding: 10px 10px 10px 0;
`

export const Td = styled.td`
  background-color: white;
  text-align:left;
  padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`

export const Th = styled.th`
  text-align:left;
  background-color: white;
  padding: 10px 10px 10px 0;
  @media (max-width: 768px) {
    padding: 1px 1px 1px 0;
  }
`

export const Container = styled.div`
  margin-top: 1%;
  margin-left: 15%;
  margin-right: 15%;
  font-family: Roboto;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 280px) {
    margin-left: 0;
    margin-right: 0;
  }
`

export const SubContainer = styled.div`
  margin-top: 1%;
  margin-left: 20%;
  margin-right: 20%;
  font-family: Roboto;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 280px) {
    margin-left: 0;
    margin-right: 0;
  }
`

export const WelcomeContainer = styled.div`
  margin-top: 1%;
  margin-left: 30%;
  margin-right: 30%;
  font-family: Roboto;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 280px) {
    margin-left: 0;
    margin-right: 0;
  }
`

export const TableContainer = styled.div`
  margin-top: 1%;
  margin-left: 20%;
  margin-right: 20%;
  font-family: Roboto;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 280px) {
    margin-left: 0;
    margin-right: 0;
  }
`

export const MessagesTableContainer = styled.div`
  margin-top: 1%;
  margin-left: 0%;
  font-family: Roboto;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 280px) {
    margin-left: 0;
    margin-right: 0;
  }
`

export const Hr = styled.hr`
  border: 1px solid;
`
