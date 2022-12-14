import React from 'react'
import { Button } from '../../../../UI/Button'
import trashBag from '../../../../../icon/trash.svg'

const EditButtons = ({ disabled, updateThisTask, deleteThisTask }) => {
  return (
    <>
      <Button disabled={disabled} className="addTask-button" onClick={updateThisTask}>
        Save
      </Button>
      <Button className="addTask-button color-delete" onClick={deleteThisTask}>
        <img src={trashBag} alt="trashBag" />
      </Button>
    </>
  )
}

export default EditButtons
