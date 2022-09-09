import './App.css'

import React, { useState, useCallback } from 'react'
import ReactModal from 'react-modal'
import CalendarToolbar from './components/CalendarToolbar'
import CalendarTable from './components/calendarTable/CalendarTable'
import { getCurrentMonth, getCurrentYear } from './components/utils/date'
import AddTaskModalWindow from './components/CalendarToolbar/taskModalWindow/addTaskModal/AddTaskModalWindow'
import { storage } from './components/utils/storage'

const API = {
  async saveTask(task) {
    return storage.addTask(task)
  },
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
      API.saveTask(task).then((tasks) => setTasks(tasks))
    },
    [tasks],
  )

  function deleteTask(task) {
    const newSelectDayToDo = tasks[task.taskDateKey].filter(({ id }) => {
      return id !== task.id
    })
    setTasks({ ...tasks, [task.taskDateKey]: newSelectDayToDo })
  }
  function updateTask(task, changes) {
    if (task.taskDate === changes.taskDate) {
      const newSelectedDayToDo = tasks[task.taskDateKey].map((dayTask) => {
        return dayTask.id === task.id ? { ...dayTask, ...changes } : task
      })

      setTasks({ ...tasks, [task.taskDateKey]: newSelectedDayToDo })

      return
    }

    const newTask = { ...task, ...changes }

    newTask.taskDateKey = `${newTask.taskDate.slice(8, 10)}${newTask.taskDate.slice(5, 7)}${newTask.taskDate.slice(
      0,
      4,
    )}`

    const selectedDayTasks = tasks[newTask.taskDateKey]
    const newDayTask = selectedDayTasks ? [...selectedDayTasks, newTask] : [newTask] // add to new day task

    const newSelectDayToDo = tasks[task.taskDateKey].filter(({ id }) => {
      // delete from old day task
      return id !== task.id
    })

    setTasks({ ...tasks, [task.taskDateKey]: newSelectDayToDo, [newTask.taskDateKey]: newDayTask })
  }

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
