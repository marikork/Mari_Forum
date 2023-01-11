import React, { Dispatch, SetStateAction } from "react"
import {
  ConfirmingContainer, ConfirmingDialog, ConfirmingDialogBody, H3, ButtonRow, CancelButton, Button
} from "../styles/styles"

interface IProps {
    setDeleteConfirmation: Dispatch<SetStateAction<boolean>>;
    setDeleteClicked: Dispatch<SetStateAction<boolean>>;
  }

const Confirm = (props: IProps) => {

  const onClickNo = () => {
    props.setDeleteClicked(false)
  }

  const onClickYes = () => {
    props.setDeleteClicked(false)
    props.setDeleteConfirmation(true)
  }


  return(
    <ConfirmingContainer>
      <ConfirmingDialog>
        <ConfirmingDialogBody>
          <H3>Confirm to delete</H3>
          <ButtonRow>
            <CancelButton onClick={() => onClickNo()}>Cancel</CancelButton><Button onClick={() => onClickYes()}>Delete</Button>
          </ButtonRow>
        </ConfirmingDialogBody>
      </ConfirmingDialog>
    </ConfirmingContainer>

  )
}
export default Confirm