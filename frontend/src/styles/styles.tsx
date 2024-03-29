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
export const MainHeaderLink = styled(Link)`
  font-size: 32px;
  text-decoration: none;
  font-weight: bold;
  color: black;
`
export const H1 = styled.h1`
  font-size: 32px;
  @media (max-width: 768px) {
    margin-left: 2%;
  }
`
export const Button = styled.button`
  font-size: 15px;
  margin-left: 5%;
  width: 100px;
  height: 30px;
  color: white;
  background: transparent;
  border-radius: 15px;
  background-color: #00b77a;
  border-style: none;
  cursor: pointer;
  &:disabled {
    background-color: #a6a6a6;
    cursor: auto;
  }
`
export const CancelButton = styled(Button)`
  background-color: #a6a6a6;
`
export const ButtonToOpenForm = styled(Button)`
  width: 150px;
  background-color: #00b77a;
  border-radius: 0px;
`
export const Form = styled.form`
  
`

export const Textarea = styled.textarea`
  width: 100%;
  margin-left: 5%;
  rows: 2;
  resize: none;
  maxLength: 250;
  font-size: 16px;
`
export const TextareaModify = styled(Textarea)`
  width: 95%;
  margin-left: 0%;
`

export const Input = styled.input`
  width: 65%;
  margin-left: 5%;
  max-width: 65%;
`

export const H2 = styled.h2`
  font-size: 24px;
`
export const H3 = styled.h3`
  font-size: 16px;
  margin-bottom: 20px;
`
export const InfoText = styled.p`
  font-size: 16px;
  margin-top: 1%;
  width: 180px;
`
export const InfoTextShort = styled(InfoText)`
  margin-bottom: 1%;
  width: 80px;
`
export const ErrorInfo = styled(InfoText)`
  font-size: 18px;
  width: 100%;
  padding: 1%;
  text-align: center;
  border-style: solid;
  border-color: red;
`
export const TopicContent = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  margin-top: 1%;
  margin-bottom: 1%;
  text-decoration: none;
`

export const ImageLink = styled.img`
  cursor: pointer;
`

export const TextRow = styled.p`
  display: flex;
  justify-content: left;
`

export const LinkRow = styled.div`
  margin-bottom: 3%;
  display: flex;
  justify-content: left;
`

export const InputRow = styled(LinkRow)`
  margin-right: 5%;
  justify-content: space-between;
`

export const ContentRow = styled(TextRow)`
  font-weight: bold;
`
export const ButtonRow = styled(LinkRow)`
  margin-left: 15%;
  margin-right: 5%;
  margin-top: 3%;
  justify-content: right;
`
export const ButtonRowToOpenForm = styled(ButtonRow)`
  margin-right: 0%;
`
export const ButtonRowModify = styled(ButtonRow)`
  margin-right: 2%;
  margin-bottom: 1%;
  @media (max-width: 992px) {
    margin-top: 2%;
  }
`
export const Table = styled.table`
  background-color: white;
  width: 100%;
  border-style: ridge;
  margin-bottom: 2%;
`

export const TableMessages = styled(Table)`
  border-style: none;
  border-top-style: solid;
  border-top-color: rgba(0, 0, 255, 0.47);
  margin-bottom: 1%;
`

export const TBody = styled.tbody`
  background-color: white;
`

export const Tr = styled.tr`
  background-color: white;
  //padding: 10px 10px 10px 0;
`

export const Td = styled.td`
  background-color: white;
  text-align:left;
`

export const TdWriter = styled(Td)`
  width: 20%;
`

export const TdMessageTime = styled(Td)`
  width: 70%;
`

export const Th = styled.th`
  text-align: left;
  background-color: white;
  padding: 5px 5px 5px 5px;
  @media (max-width: 768px) {
    padding: 1px 1px 1px 0;
  }
`
export const ThMessage = styled.th`
  font-size: 16px;
  margin: 0;
  font-weight: normal !important;
  text-align: left !important;
`

export const TdCreator = styled(Td)`
  width: 65%;
  padding: 0 0 0 5px;
  @media (max-width: 992px) {
    width: 40%;
  }
`

export const TdCount = styled(Td)`
  width: 10%;
  @media (max-width: 992px) {
    width: 20%;
  }
`

export const TdTime = styled(Td)`
  width: 15%;
  @media (max-width: 992px) {
    width: 20%;
  }
`

export const TdButton = styled(Td)`
  width: 5%;
  @media (max-width: 992px) {
    width: 10%;
  }
`

export const Container = styled.div`
  margin-top: 1%;
  margin-left: 15%;
  margin-right: 15%;
  @media (max-width: 768px) {
    margin-left: 2%;
    margin-right: 2%;
  }
`

export const SubContainer = styled.div`
  margin-top: 1%;
  margin-left: 20%;
  margin-right: 20%;
  @media (max-width: 600px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 600px) {
    margin-left: 10%;
    margin-right: 10%;
  }
  @media (min-width: 992px) {
    margin-left: 30%;
    margin-right: 30%;
  }
`

export const UpperSubContainer = styled.div`
  margin-top: 1%;
  margin-left: 20%;
  margin-right: 2%;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 1499px) {
    margin-left: 10%;
    margin-right: 10%;
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
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`

export const TableContainer = styled.div`
  margin-top: 1%;
  margin-left: 20%;
  margin-right: 2%;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 768px) {
    margin-left: 10%;
    margin-right: 10%;
  }
  @media (min-width: 1500px) {
    margin-left: 15%;
    margin-right: 15%;
  }
`

export const MessagesTableContainer = styled.div`
  margin-top: 1%;
  margin-left: 0%;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`

export const ModifyingContainer = styled.div`
  margin-top: 10%;
  margin-left: 30%;
  margin-right: 30%;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
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

