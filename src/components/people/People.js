import React, { useState, useContext } from 'react'
import { PeopleContext } from './PeopleProvider'
// import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap'

export default ({ people, venues }) => {
  const { removePeople } = useContext(PeopleContext)

  const [selectedPeople] = useState({
    people: {},
  })

  return (
    <section className='box people'>
      <button
        className='xOut'
        onClick={() => {
          removePeople(people.id)
        }}
      >
        ×
      </button>
      <h6 className='people__name'>{people.name}</h6>
      <p className='fs-x-small'>{venues.name}</p>
    </section>
  )
}
