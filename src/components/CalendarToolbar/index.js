import './calendarNavigation.css'

import React, { useState } from 'react'

import { Button } from '../UI/Button'
import SelectDateModalWindow from './taskModalWindow/selectDateModal/SelectDateModalWindow'
import calendarSVG from '../../icon/calendar.svg'
import { Months } from '../../constants/date'

export default function CalendarNavigation({ selectedDate, setSelectedDate, setIsOpenModalTask }) {
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

function CreateTaskButton({ onClick }) {
  return (
    <Button onClick={onClick} className="create-task-button">
      +
    </Button>
  )
}

function CalendarNavigator({ selectedDate, setSelectedDate, onCalendarClick }) {
  function onPreviousMonthClick() {
    if (selectedDate.month === 0) {
      setSelectedDate({ month: 11, year: selectedDate.year - 1 })
    } else {
      setSelectedDate({ month: selectedDate.month - 1, year: selectedDate.year })
    }
  }

  function onNextMonth() {
    if (selectedDate.month === 11) {
      setSelectedDate({ month: 0, year: selectedDate.year + 1 })
    } else {
      setSelectedDate({ month: selectedDate.month + 1, year: selectedDate.year })
    }
  }

  const title = `${Months[selectedDate.month]} ${selectedDate.year}`

  return (
    <div className="navigation-select-date">
      <Button onClick={onPreviousMonthClick} className="button-navigation-change-month">
        {'<'}
      </Button>

      <span className="navigation-date-span">{title}</span>

      <Button onClick={onNextMonth} className="button-navigation-change-month">
        {'>'}
      </Button>

      <Button onClick={onCalendarClick} className="button-select-month">
        <img src={calendarSVG} alt="calendar" />
      </Button>
    </div>
  )
}
