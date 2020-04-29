import React, { useState, useContext, useEffect } from 'react'
import { AnimalContext } from '../animal/AnimalProvider'
import { Animal } from '../animal/Animal'
import { CustomerContext } from '../customer/CustomerProvider'
import { LocationContext } from '../location/LocationProvider'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap'
import { EditAnimalForm } from '../animal/EditAnimalForm'

import './search.css'

export const SearchResults = ({ searchTerms }) => {
  const { animals, releaseAnimal } = useContext(AnimalContext)
  const { customers } = useContext(CustomerContext)
  const { locations } = useContext(LocationContext)

  const [filteredAnimals, setFiltered] = useState([])
  const [selectedAnimal, setAnimal] = useState({
    animal: {},
    location: null,
    customer: null,
  })

  // Toggle details modal
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // Toggle edit modal
  const [editModal, setEditModal] = useState(false)
  const toggleEdit = () => setEditModal(!editModal)

  useEffect(() => {
    if (searchTerms !== '') {
      const subset = animals.filter((animal) =>
        animal.name.toLowerCase().includes(searchTerms)
      )
      setFiltered(subset)
    } else {
      setFiltered([])
    }
  }, [searchTerms, animals])

  return (
    <div className='searchResults br-BQ pad0'>
      <dl className='animals href'>
        {filteredAnimals.map((animal) => (
          <dd
            className='href'
            onClick={() => {
              const location = locations.find((l) => l.id === animal.locationId)
              const customer = customers.find((c) => c.id === animal.customerId)

              setAnimal({ animal, location, customer })
              toggle()
            }}
          >
            {animal.name}
          </dd>
        ))}
      </dl>

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>
          {selectedAnimal.animal.name}
        </ModalHeader>
        <ModalBody>
          <EditAnimalForm
            key={selectedAnimal.animal.id}
            toggleEdit={toggleEdit}
            {...selectedAnimal}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit</ModalHeader>
        <ModalBody>
          <Animal key={selectedAnimal.animal.id} {...selectedAnimal} />
        </ModalBody>
        <ModalFooter>
          <Button
            color='info'
            onClick={() => {
              toggle()
              toggleEdit()
            }}
          >
            Edit
          </Button>
          <Button
            color='danger'
            onClick={() => {
              releaseAnimal(selectedAnimal.animal.id)
              toggle()
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
