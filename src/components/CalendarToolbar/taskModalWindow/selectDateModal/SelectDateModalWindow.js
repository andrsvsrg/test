import './selectDateModalWindow.css'

import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import cn from 'classnames'
import { Months } from '../../../../constants/date'
import { Button } from '../../../UI/Button'

export default function SelectDateModalWindow({ isOpenModalSelectDate, onClose, selectedDate, setSelectedDate }) {
  const [yearsList, setYearsList] = useState(() => [selectedDate.year - 1, selectedDate.year, selectedDate.year + 1])
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.month) // (0-11)

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

function MonthsGrid({ selectedMonth, setSelectedMonth }) {
  return (
    <div className="modal-months">
      {Months.map((month, index) => {
        const className = cn('modal-oneMonth', { 'modal-selected-monthYear': selectedMonth === index })

        return (
          <div onClick={() => setSelectedMonth(index)} key={month} className={className}>
            {month}
          </div>
        )
      })}
    </div>
  )
}

function YearsChooser({ setYearsList, yearsList }) {
  const yearsClasses = (index) => 'modal-oneYear ' + (index === 1 ? 'modal-selected-monthYear' : '')

  function minusOneYear() {
    setYearsList(yearsList.map((year) => year - 1))
  }

  function plusOneYear() {
    setYearsList(yearsList.map((year) => year + 1))
  }

  return (
    <div className="modal-years">
      <Button className="modal-buttons-year" onClick={minusOneYear}>
        {'<'}
      </Button>

      {yearsList.map((year, i) => {
        return (
          <div key={year} className={yearsClasses(i)}>
            {year}
          </div>
        )
      })}

      <Button className="modal-buttons-year" onClick={plusOneYear}>
        {'>'}
      </Button>
    </div>
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
