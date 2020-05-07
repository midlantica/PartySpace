import React, { useContext, useState } from 'react'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'

export const VenueEdit = ({ partyspace, customer, toggleEdit }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { venues } = useContext(VenueContext)
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
    <form className='VenueEditForm'>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='title'>Venue Name:</label>
          <input
            type='text'
            name='title'
            required
            autoFocus
            className='form-control'
            placeholder='Venue name'
            defaultValue={venues.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='mapUrl'>Map Url:</label>
          <input
            type='text'
            name='mapUrl'
            required
            className='form-control'
            placeholder='Venue Map Url'
            defaultValue={venues.geourl}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='duration'>Duration:</label>
          <input
            type='number'
            name='duration'
            required
            className='form-control'
            placeholder='Venue Duration'
            defaultValue={venues.duration}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <div className='flexRow just-space-between'>
        <button
          type='Delete'
          className='btn btn-primary ps-button bg-danger fs-small mar0'
          onClick={(evt) => {
            evt.preventDefault()
            // deleteEvent()
          }}
        >
          Delete Venue
        </button>

        <button
          type='submit'
          className='btn btn-primary ps-button fs-small mar0'
          onClick={(evt) => {
            evt.preventDefault()
            VenueEdit()
          }}
        >
          Edit Venue
        </button>
      </div>
    </form>
  )
}
