import React from 'react'

export default function CreatedAt({ task }) {
  if (!task) {
    return
  }

  if (task.editedDate) {
    return <div>Updated at: {task.editedDate}</div>
  }

  if (task.createdDate) {
    return <div>Created at: {task.createdDate}</div>
  }
}