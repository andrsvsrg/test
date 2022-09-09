import './calendarTable.css'

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { TasksList } from './task/Task'
import * as DateUtils from '../utils/date'

const CalendarTable = ({ tasks, selectedDate, onTaskEdit }) => {
  const [days, setDays] = useState(() => createAllDaysForCurrWindow(selectedDate.year, selectedDate.month))

  useEffect(() => {
    setDays(createAllDaysForCurrWindow(selectedDate.year, selectedDate.month))
  }, [selectedDate])

  const classNamesDataItem = (currentDay) => {
    return 'calendar-dataItem ' + (currentDay.isToday ? 'today ' : '')
  }

  const classNamesItemHeader = (currentDay) => {
    return 'item-day-dayOfWeek ' + (!currentDay.isCurrentMonth ? 'not-this-month' : '')
  }

  // TODO: replace classNamesDataItem with cn

  return (
    <div className="calendar-table">
      {days.map((day) => (
        <div className={classNamesDataItem(day)} key={day.id}>
          <div className={classNamesItemHeader(day)}>
            <div className="calendar-day-of-month">{day.day}</div>
            <div className="calendar-day-of-week">{day.dayOfWeek}</div>
          </div>

          {tasks[day.id] && <TasksList onTaskEdit={onTaskEdit} tasks={tasks[day.id]} />}
        </div>
      ))}
    </div>
  )
}

export default CalendarTable

function createOneDay(newDay, selectMonthValue) {
  return {
    id: DateUtils.getId(newDay),
    day: DateUtils.getDayOfMonth(newDay),
    month: DateUtils.getMonthOfYear(newDay),
    year: DateUtils.getYear(newDay),
    dayOfWeek: DateUtils.getDayOfWeek(newDay),
    isCurrentMonth: DateUtils.isCurrentMonth(newDay, selectMonthValue),
    isToday: DateUtils.isToday(newDay),
  }
}

function createAllDaysForCurrWindow(year, month, day = 1) {
  const selectedDay = DateUtils.setCurrentMomentDate(year, month, day)
  const startDay = selectedDay.clone().startOf('month').startOf('week')
  const endDay = selectedDay.clone().endOf('month').endOf('week')
  const currDay = startDay.subtract(1, 'day').clone()
  const AllDaysArrCurrenWindow = []

  do {
    AllDaysArrCurrenWindow.push(createOneDay(currDay.add(1, 'day').clone(), month))
  } while (!DateUtils.isSameDate(currDay, endDay))

  return AllDaysArrCurrenWindow
}
