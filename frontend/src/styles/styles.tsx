import styled from "styled-components"
import { Link } from "react-router-dom"

export const NavBar = styled.nav` 
font-size: 12px;
top: 0;
z-index: 999;
height: 25px;
background-color: rgba(0, 0, 255, 0.47);
display: flex;
justify-content: right;
align-items: center;
`
export const NavLink = styled(Link)`
text-decoration: none;
font-weight: bold;
font-size: 1.1rem;
color: #fff;
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem 2rem;
height: 100%;
&:hover {
    color: #ffdab3;
}
`

export const Button = styled.button`
  font-family: Roboto !important;
  font-size: 15px;
  margin-left: 5%;
  width: 100px;
  height: 30px;
  color: white;
  background: transparent;
  border-radius: 15px;
  background-color: #00b77a;//#4de6bf;//#01cb88;//#01b67a;
  border-style: none;
  cursor: pointer;
  :disabled {
    background-color: #a6a6a6;//opacity: 0.6;
    cursor: auto;
  }
`

export const CancelButton = styled.button`
  font-family: Roboto !important;
  font-size: 15px;
  margin-left: 5%;
  width: 100px;
  height: 30px;
  color: white;
  background: transparent;
  border-radius: 15px;
  background-color: #a6a6a6;//#bfbfbf;
  border-style: none;
  cursor: pointer;
`

export const ButtonToOpenForm = styled.button`
  font-family: Roboto !important;
  font-size: 15px;
  margin-left: 5%;
  width: 150px;
  height: 30px;
  color: white;
  background: transparent;
  //border-radius: 15px;
  background-color: #00b77a;//#4de6bf;
  border-style: none;
  cursor: pointer;
`
/*
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
`*/

export const MainHeaderLink = styled(Link)`
  font-family: Roboto;
  font-size: 32px;
  text-decoration: none;
  font-weight: bold;
  color: black;
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
  max-width: 100%;
`

export const InputTopicMessage = styled.input`
  width: 380px;
  margin-left: 5%;
  max-width: 100%;
  @media (max-width: 1499px) {
    width: 580px;
  }
  @media (min-width: 1500px) {
    width: 680px;
  }
`

export const InputModify = styled.input`
  width: 335px;
  margin-left: 0%;
  max-width: 100%;
`

export const InputModifyMessage = styled.input`
  font-family: Roboto;  
  width: 335px;
  margin-left: 0%;
  font-size: 18px;
  max-width: 100%;
`

export const H2 = styled.h2`
  font-family: Roboto;
  font-size: 24px;
  //padding-left: 10px;
`

export const H3 = styled.h3`
  font-family: Roboto;
  font-size: 16px;
  margin-bottom: 20px;
`

export const InfoText = styled.p`
  font-family: Roboto;
  font-size: 16px;
  margin-top: 1%;
  width: 180px;
`

export const InfoTextShort = styled.p`
  font-family: Roboto;
  font-size: 16px;
  margin-top: 1%;
  margin-bottom: 1%;
  width: 120px;
`

export const TopicContent = styled(Link)`
font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  margin-top: 1%;
  margin-bottom: 1%;
  text-decoration: none;
`

export const ButtonSmall = styled.button`
  font-family: Roboto !important;
  font-size: 15px;
  margin-left: 5%;
  //width: 100px;
  //height: 30px;
  background: transparent;
  border-radius: 15px;
  background-color: white;
  border-style: none;
  cursor: pointer;
`

export const LinkRow = styled.div`
  //margin-left: 15%;
  margin-bottom: 3%;
  display: flex;
  justify-content: left;
`

export const InputRow = styled.div`
  //margin-left: 5%;
  margin-bottom: 3%;
  margin-right: 5%;
  display: flex;
  justify-content: space-between;
`

export const InputModifyRow = styled.div`
  //margin-left: 5%;
  margin-bottom: 3%;
  margin-right: 0%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
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
  margin-top: 3%;
  display: flex;
  justify-content: right;
`

export const ButtonRowModify = styled.div`
  //margin-left: 15%;
  //margin-right: 5%;
  display: flex;
  justify-content: right;
`

export const Table = styled.table`
  background-color: white;
  width: 100%;
  border-style: ridge;
  margin-bottom: 3%;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export const TableMessages = styled.table`
  background-color: white;
  width: 100%;
  border-top-style: solid;
  border-top-color: rgba(0, 0, 255, 0.47);
  margin-bottom: 3%;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export const TableTopics = styled.table`
  background-color: white;
  width: 100%;
  border-style: ridge;
  margin-bottom: 3%;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export const TableInside = styled.table`
  background-color: white;
  width: 100%;
  border-style: ridge;
  margin-bottom: 3%;
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
  //padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`

export const TdWriter = styled.td`
  background-color: white;
  text-align:left;
  width: 20%;
  //padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`

export const TdMessageTime = styled.td`
  background-color: white;
  text-align:left;
  width: 70%;
  //padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`
export const ThMessage = styled.th`
  font-size: 18px;
  margin: 0;
  font-weight: normal !important;
  text-align: left !important;
  //padding: 10px 10px 10px 0;
  @media (max-width: 768px) {
    padding: 1px 1px 1px 0;
  }
`

export const TdCreator = styled.td`
  background-color: white;
  text-align:left;
  width: 40%;
  //padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`

export const TdCount = styled.td`
  background-color: white;
  text-align:left;
  width: 10%;
  //padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`

export const TdTime = styled.td`
  background-color: white;
  text-align:left;
  width: 30%;
  //padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`

export const TdButton = styled.td`
  background-color: white;
  text-align:left;
  width: 10%;
  //padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`

export const SaveButton = styled.div`
  background-color: white;
  text-align:left;
  width: 10%;
  //padding: 0px 50px 0px 0px;
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
  @media (min-width: 1500px) {
    margin-left: 30%;
    margin-right: 30%;
  }
`

export const UpperSubContainer = styled.div`
  margin-top: 1%;
  margin-left: 20%;
  margin-right: 2%;
  font-family: Roboto;
  @media (max-width: 1499px) {
    margin-left: 10%;
    margin-right: 10%;
  }
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 280px) {
    margin-left: 0;
    margin-right: 0;
  }
  @media (min-width: 1500px) {
    margin-left: 15%;
    margin-right: 15%;
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
  margin-right: 2%;
  font-family: Roboto;
  @media (max-width: 1499px) {
    margin-left: 10%;
    margin-right: 10%;
  }
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 280px) {
    margin-left: 0;
    margin-right: 0;
  }
  @media (min-width: 1500px) {
    margin-left: 15%;
    margin-right: 15%;
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

export const ModifyingContainer = styled.div`
  margin-top: 10%;
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

export const ConfirmingContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`

export const ConfirmingDialog = styled.div`
  display: block;
`

export const ConfirmingDialogBody = styled.div`
  width: 300px;
  padding: 30px;
  text-align: left;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 20px 75px rgb(0 0 0 / 13%);
  color: #666;
`

export const Hr = styled.hr`
  border: 1px solid;
`
