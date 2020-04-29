import React, { useState, useContext } from 'react'
import { EmployeeContext } from './EmployeeProvider'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap'

export default ({ employee, location }) => {
  const { removeEmployee } = useContext(EmployeeContext)

  const [selectedEmployee] = useState({
    employee: {},
  })

  return (
    <section className='box employee'>
      <button
        className='xOut'
        onClick={() => {
          removeEmployee(employee.id)
        }}
      >
        ×
      </button>
      <h6 className='employee__name'>{employee.name}</h6>
      <p className='fs-x-small'>{location.name}</p>
    </section>
  )
}
