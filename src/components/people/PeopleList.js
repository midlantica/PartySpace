import React, { useContext, useState } from 'react'
import { PeopleContext } from './PeopleProvider'
import People from './People'
import { VenueContext } from '../venues/VenueProvider'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PeopleForm from './PeopleForm'

export default () => {
  const { people } = useContext(PeopleContext)
  const { venues } = useContext(VenueContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  return (
    <>
      <div className='flexRow'>
        <h4 className='marRH'>Peoples</h4>
        <div className='plusBtn' onClick={toggle}>
          &#65291;
        </div>
      </div>

      <div className='gridSection people'>
        {people.map((people) => {
          const ven = venues.find((l) => l.id === people.venueId)

          return <People key={people.id} venue={ven} people={people} />
        })}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>New People</ModalHeader>
        <ModalBody>
          <PeopleForm toggler={toggle} />
        </ModalBody>
      </Modal>
    </>
  )
}
