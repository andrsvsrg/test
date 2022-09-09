import { Months } from '../../../../../constants/date'
import cn from 'classnames'
import React from 'react'

export default function MonthsGrid({ selectedMonth, setSelectedMonth }) {
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