import './addTaskModalWindow.css'

import moment from 'moment'
import React, { useMemo, useState } from 'react'
import Modal from 'react-modal'

import { Button } from '../../../UI/Button'
import { TextField } from '@mui/material'
import EditButtons from './editButtons/EditButtons'
import CreatedAt from './CreatedAt'

import { v4 as uuid } from 'uuid'
import { getCurrentDate, getCurrentTime, getFullTime} from '../../../../utils/date'
import cross from '../../../../icon/cross.svg'

const AddTaskModalWindow = ({ updateTask, deleteTask, addTask, onClose, task }) => {
  const [titleInput, setTitleInput] = useState(task?.title || '')
  const [descriptionInput, setDescriptionInput] = useState(task?.description || '')
  const [dateInput, setDateInput] = useState(() => task?.taskDate || getCurrentDate())
  const [timeInput, setTimeInput] = useState(() => task?.beginTime || getCurrentTime(moment()))

  const isDisabledButton = useMemo(() => {
    return !(titleInput.trim() && dateInput.trim() )  // && isValidDate(dateInput)
  }, [titleInput, dateInput])

  function deleteThisTask() {
    deleteTask(task)
    onClose()
  }

  function addNewTask() {
    const newTask = createNewTask(titleInput, descriptionInput, dateInput, timeInput)

    addTask(newTask)
    onClose()
  }

  function updateThisTask() {
    const changes = {
      description: descriptionInput,
      title: titleInput,
      taskDate: dateInput,
      editedDate: getFullTime(moment()),
      beginTime: timeInput,
    }

    updateTask(task, changes)

    onClose()
  }

  function onTitleChange(e) {
    setTitleInput(e.target.value)
  }

  function onDateChange(e) {
    setDateInput(e.target.value)
  }

  return (
    <Modal style={addTaskModalStyle} isOpen>
      <div className="modal-header">
        <span>{task ? 'Edit Idea' : 'Add New Idea'}</span>

        <Button onClick={onClose} className="modal-header-buttonClose">
          <img src={cross} alt="cross" />
        </Button>
      </div>

      <CreatedAt task={task} />

      <TextField
        required
        id="standard-basic"
        variant="standard"
        value={titleInput}
        onChange={onTitleChange}
        label="Title"
        sx={{ mt: 2, mb: 1 }}
        fullWidth
      />

      <TextField
        id="standard-multiline-static"
        variant="standard"
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
        multiline
        rows={4}
        label="Description"
        sx={{ mt: 2, mb: 2 }}
        fullWidth
      />

      <div className="modal-inputs-dataTime">
        <TextField
          required
          id="standard-multiline-static"
          variant="standard"
          label="Date"
          sx={{ mt: 2, mb: 1, width: '16ch' }}
          onChange={onDateChange}
          helperText="(YYYY.MM.DD)"
          value={dateInput}
        />

        <TextField
          id="standard-multiline-static"
          variant="standard"
          label="Time"
          sx={{ mt: 2, mb: 1, width: '8ch' }}
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
        />
      </div>

      {task && <EditButtons disabled={isDisabledButton} updateThisTask={updateThisTask} deleteThisTask={deleteThisTask} />}

      {!task && (
        <Button disabled={isDisabledButton} className="addTask-button" onClick={addNewTask}>
          Save
        </Button>
      )}
    </Modal>
  )
}

export default AddTaskModalWindow



function createNewTask(titleInput, descriptionInput, dateInput, timeInput) {
  const taskDateKey = `${dateInput.slice(8, 10)}${dateInput.slice(5, 7)}${dateInput.slice(0, 4)}`
  return {
    id: uuid(),
    taskDateKey,
    title: titleInput,
    description: descriptionInput,
    createdDate: getFullTime(moment()),
    editedDate: '',
    taskDate: dateInput,
    beginTime: timeInput,
  }
}


const addTaskModalStyle = {
  content: {
    top: '40%',
    left: '50%',
    width: '350px',
    height: '440px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
