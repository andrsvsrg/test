import './selectDateModalWindow.css'

import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

import { Button } from '../../../UI/Button'
import MonthsGrid from './MonthsGrid'
import YearsChooser from './YearsChooser'


export default function SelectDateModalWindow({ isOpenModalSelectDate, onClose, selectedDate, setSelectedDate }) {
  const [yearsList, setYearsList] = useState(() => [selectedDate.year - 1, selectedDate.year, selectedDate.year + 1])
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.month)

  useEffect(() => {
    setYearsList([selectedDate.year - 1, selectedDate.year, selectedDate.year + 1])
    setSelectedMonth(selectedDate.month)
  }, [isOpenModalSelectDate, selectedDate])

  let selectedYear = yearsList[1]

  function changeSelectedDate() {
    setSelectedDate({ month: selectedMonth, year: selectedYear })
    onClose()
  }

  return (
    <Modal isOpen={isOpenModalSelectDate} style={selectedDateModalsStyle}>
      <MonthsGrid selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

      <YearsChooser setYearsList={setYearsList} yearsList={yearsList} />

      <Button className="modal-changeDate-button" onClick={changeSelectedDate}>
        Select this date
      </Button>
    </Modal>
  )
}

const selectedDateModalsStyle = {
  content: {
    top: '25%',
    left: '50%',
    width: '350px',
    height: '250px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
