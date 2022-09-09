import { Button } from '../../../../UI/Button'
import cn from 'classnames'
import React from 'react'

export default function YearsChooser({ setYearsList, yearsList }) {

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

      {yearsList.map((year, index) => {
        const yearsClasses = cn('modal-oneYear', {'modal-selected-monthYear' : index === 1})

        return (
          <div key={year} className={yearsClasses}>
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