import React, { useContext, useState } from 'react'
import { PeopleContext } from './PeopleProvider'
import People from './People'
import { VenueContext } from '../venues/VenueProvider'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PeopleForm from './PeopleForm'

export default () => {
  const { peoples } = useContext(PeopleContext)
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

      {/* <div className='gridSection people'>
        {peoples.map((people) => {
          const partyspace = partyspace.find(
            (partyspace) => partyspace.id === peoples.partySpaceId
          )

          return (
            <People key={peoples.id} partyspace={partyspace} people={people} />
          )
        })}
      </div> */}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>New People</ModalHeader>
        <ModalBody>
          <PeopleForm toggler={toggle} />
        </ModalBody>
      </Modal>
    </>
  )
}
