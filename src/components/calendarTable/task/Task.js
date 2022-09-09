import './task.css'

import React from 'react'

export const TasksList = ({ tasks, onTaskEdit }) => {
  return (
    <>
      {tasks.map((task) => (
        <div onClick={() => onTaskEdit(task)} key={task.id} className="task-item">
          {task.title}
        </div>
      ))}
    </>
  )
}
