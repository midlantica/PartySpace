import React, { useContext, useState } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { LocationContext } from '../venues/VenueProvider'

export const EditPartySpaceForm = ({ partyspace, customer, toggleEdit }) => {
  const { locations } = useContext(LocationContext)
  const { updatePartySpace } = useContext(PartySpaceContext)

  // Separate state variable to track the partyspace as it is edited
  const [updatedPartySpace, setPartySpace] = useState(partyspace)

  /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
  const handleControlledInputChange = (event) => {
    // Create a new copy of the partyspace being edited
    const newPartySpace = Object.assign({}, updatedPartySpace)

    // Change the property value on the copy
    newPartySpace[event.target.name] = event.target.value

    // Set the copy as the new state
    setPartySpace(newPartySpace)
  }

  const editPartySpace = () => {
    const locationId = parseInt(updatedPartySpace.locationId)

    if (locationId === 0) {
      window.alert('Please select a location')
    } else {
      updatePartySpace({
        id: updatedPartySpace.id,
        name: updatedPartySpace.name,
        breed: updatedPartySpace.breed,
        locationId: locationId,
        customerId: parseInt(localStorage.getItem('partySpace_user')),
      }).then(toggleEdit)
    }
  }

  return (
    <form className='partyspaceForm'>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='title'>Title of Event:</label>
          <input
            type='text'
            name='title'
            required
            autoFocus
            className='form-control'
            placeholder='PartySpace title'
            defaultValue={partyspace.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            type='textarea'
            name='description'
            required
            className='form-control'
            placeholder='PartySpace description'
            defaultValue={partyspace.description}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='datestart'>Start Date:</label>
          <input
            type='time'
            name='datestart'
            required
            className='form-control'
            placeholder='PartySpace datestart'
            defaultValue={partyspace.datestart}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='timestart'>Start Time:</label>
          <input
            type='time'
            name='timestart'
            required
            className='form-control'
            placeholder='PartySpace timestart'
            defaultValue={partyspace.timestart}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <button
        type='Delete'
        className='btn btn-primary btn-danger'
        onClick={(evt) => {
          evt.preventDefault()
          deletePartySpace()
        }}
      >
        Delete PartySpace
      </button>

      <button
        type='submit'
        className='btn btn-primary'
        onClick={(evt) => {
          evt.preventDefault()
          editPartySpace()
        }}
      >
        Save PartySpace
      </button>
    </form>
  )
}
