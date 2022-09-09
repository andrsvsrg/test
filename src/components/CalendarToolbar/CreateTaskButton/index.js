import { Button } from '../../UI/Button'
import React from 'react'

export default function CreateTaskButton({ onClick }) {
  return (
    <Button onClick={onClick} className="create-task-button">
      +
    </Button>
  )
}