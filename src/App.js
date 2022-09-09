import './App.css'

import React, { useState, useCallback } from 'react'
import ReactModal from 'react-modal'
import { storage } from './utils/storage'

import CalendarToolbar from './components/CalendarToolbar'
import CalendarTable from './components/calendarTable/CalendarTable'
import AddTaskModalWindow from './components/CalendarToolbar/taskModalWindow/addTaskModal/AddTaskModalWindow'

import { getCurrentMonth, getCurrentYear } from './utils/date'

const API = {
  async saveTask(task) {
    return storage.addTask(task)
  },
  async deleteTask(task) {
    return storage.deleteTask(task)
  },
  async updateTask(task, changes) {
    return storage.updateTask(task, changes)
  }
}

function App() {
  const onRef = useCallback((ref) => {
    ReactModal.setAppElement(ref)
  }, [])

  const [selectedDate, setSelectedDate] = useState(() => ({
    month: getCurrentMonth(),
    year: getCurrentYear(),
  }))

  const [isOpenModalTask, setIsOpenModalTask] = useState(false)

  const [taskToEdit, setTaskToEdit] = useState(null)

  const [tasks, setTasks] = useState(() => storage.getTasks())

  const addTask = useCallback(
    (task) => {
      API.saveTask(task).then((newTasks) => setTasks(newTasks))
    },
    [],
  )

  const deleteTask = useCallback(
    (task) => {
    API.deleteTask(task).then((newTasks) => setTasks(newTasks))
  },
    [])

  const updateTask = useCallback(
    (task, changes) => {
      API.updateTask(task, changes).then((newTasks) => setTasks(newTasks))
    },
    [])

  const onTaskEdit = useCallback((task) => {
    setTaskToEdit(task)
    setIsOpenModalTask(true)
  }, [])

  const onModalClose = useCallback(() => {
    setIsOpenModalTask(false)
    setTaskToEdit(null)
  }, [])



  return (
    <div className="App" ref={onRef}>
      <CalendarToolbar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setIsOpenModalTask={setIsOpenModalTask}
      />

      <CalendarTable tasks={tasks} onTaskEdit={onTaskEdit} selectedDate={selectedDate} />

      {isOpenModalTask && (
        <AddTaskModalWindow
          updateTask={updateTask}
          deleteTask={deleteTask}
          addTask={addTask}
          task={taskToEdit}
          onClose={onModalClose}
        />
      )}
    </div>
  )
}

export default App
