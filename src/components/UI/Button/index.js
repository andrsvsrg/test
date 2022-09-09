import './button-style.css'

import React from 'react'

export const Button = (props) => {
  const classNames = 'myButton-default-style ' + props.className
  const { tooltip } = props

  return (
    <button {...props} title={tooltip} className={classNames}>
      {props.children}
    </button>
  )
}
