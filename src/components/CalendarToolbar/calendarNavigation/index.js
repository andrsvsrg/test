import React from 'react'

import { Button } from '../../UI/Button'

import { Months } from '../../../constants/date'
import calendarSVG from '../../../icon/calendar.svg'


export default function CalendarNavigator({ selectedDate, setSelectedDate, onCalendarClick }) {
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