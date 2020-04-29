import React, { useContext, useState } from 'react'
import { EmployeeContext } from './EmployeeProvider'
import Employee from './Employee'
import { LocationContext } from '../location/LocationProvider'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import EmployeeForm from './EmployeeForm'

export default () => {
  const { employees } = useContext(EmployeeContext)
  const { locations } = useContext(LocationContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  return (
    <>
      <div className='flexRow'>
        <h4 className='marRH'>Employees</h4>
        <div className='plusBtn' onClick={toggle}>
          &#65291;
        </div>
      </div>

      <div className='gridSection employees'>
        {employees.map((employee) => {
          const loc = locations.find((l) => l.id === employee.locationId)

          return (
            <Employee key={employee.id} location={loc} employee={employee} />
          )
        })}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Employee</ModalHeader>
        <ModalBody>
          <EmployeeForm toggler={toggle} />
        </ModalBody>
      </Modal>
    </>
  )
}
