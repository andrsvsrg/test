import './calendarToolbar.css'

import React, { useState } from 'react'

import SelectDateModalWindow from './taskModalWindow/selectDateModal/SelectDateModalWindow'
import CreateTaskButton from './CreateTaskButton'
import CalendarNavigator from './calendarNavigation'

export default function CalendarToolbar({ selectedDate, setSelectedDate, setIsOpenModalTask }) {
  const [isOpenModalSelectDate, setIsOpenModalSelectDate] = useState(false)

  const openCreateTaskModal = () => {
    setIsOpenModalTask(true)
  }

  const onCalendarClose = () => setIsOpenModalSelectDate(false)

  const onCalendarClick = () => setIsOpenModalSelectDate(true)

  return (
    <div className="calendar-navigation">
      <div className="navigation-add-task">
        <CreateTaskButton onClick={openCreateTaskModal} />
      </div>

      <CalendarNavigator
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onCalendarClick={onCalendarClick}
      />

      <SelectDateModalWindow
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onClose={onCalendarClose}
        isOpenModalSelectDate={isOpenModalSelectDate}
      />
    </div>
  )
}




