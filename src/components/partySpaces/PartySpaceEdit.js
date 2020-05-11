// EDIT EXISTING PARTYSPACE -- NOT CREATE NEW! (not yet)
//
import React, { useContext, useRef, useState } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { VenueContext } from '../venues/VenueProvider'

export const EditPartySpaceForm = ({ partySpace, customer, toggleEdit }) => {
  const { venues } = useContext(VenueContext)
  const { updatePartySpace } = useContext(PartySpaceContext)
  const venueId = parseInt(updatedPartySpace.venueId)

  const title = useRef()
  const dateStart = useRef()
  const timeStart = useRef()
  const description = useRef()

  // Separate state variable to track the partyspace as it is edited
  const [updatedPartySpace, setPartySpace] = useState(partySpace)

  const handleControlledInputChange = (event) => {
    // Create a new copy of the partyspace being edited
    const newPartySpace = Object.assign({}, updatedPartySpace)

    // Change the property value on the copy
    newPartySpace[event.target.name] = event.target.value

    // Set the copy as the new state
    setPartySpace(newPartySpace)
  }

  const editPartySpace = () => {
    const venueId = parseInt(updatedPartySpace.venueId)

    if (venueId === 0) {
      window.alert('Please select a venue')
    } else {
      updatePartySpace({
        id: updatedPartySpace.id,
        title: updatedPartySpace.title,
        startDate: updatedPartySpace.startDate,
        startTime: updatedPartySpace.startTime,
        description: updatedPartySpace.description,
        venueId: venueId,
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
            defaultValue={partySpace.title}
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
            defaultValue={partySpace.description}
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
            defaultValue={partySpace.datestart}
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
            defaultValue={partySpace.timestart}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <button
        type='Delete'
        className='btn btn-primary btn-danger'
        onClick={(evt) => {
          evt.preventDefault()
          // deletePartySpace()
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
