import React, { useContext, useState } from 'react'
import { PeopleContext } from './PeopleProvider'
import People from './People'
import { VenueContext } from '../venues/VenueProvider'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PeopleForm from './PeopleForm'

export default () => {
  const { peoples } = useContext(PeopleContext)
  const { venues } = useContext(VenueContext)

  return (
    <>
      <div className='flexRow'>
        <h4 className='marRH'>Peoples</h4>
        <div className='plusBtn' onClick={toggle}>
          &#65291;
        </div>
      </div>
    </>
  )
}
