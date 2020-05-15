import React, { useContext, useRef, useState } from 'react'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'

export const VenueEdit = ({ partySpace, toggleEdit }) => {
  const userId = parseInt(localStorage.getItem('partySpace_user'))
  const { venues } = useContext(VenueContext)
  const { updatePartySpace } = useContext(PartySpaceContext)
  const { updatePartySpaceVenues } = useContext(PartySpaceVenuesContext)

  const name = useRef()
  const duration = useRef()

  // Separate state variable to track the partySpace as it is edited
  const [updatedPartySpaceVenues, setPartySpaceVenues] = useState(partySpace)

  /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
  const handleControlledInputChange = (event) => {
    // Create a new copy of the partySpace being edited
    const newPartySpaceVenue = Object.assign({}, updatedPartySpaceVenues)

    // Change the property value on the copy
    newPartySpaceVenue[event.target.name] = event.target.value

    // Set the copy as the new state
    setPartySpaceVenues(newPartySpaceVenue)
  }

  const VenueEdit = () => {
    const venueId = parseInt(updatedPartySpaceVenues.venueId)

    if (venueId === 0) {
      window.alert('Please select a location')
    } else {
      updatePartySpaceVenues({
        id: updatedPartySpaceVenues.id,
        name: updatedPartySpaceVenues.name,
        geourl: updatedPartySpaceVenues.geourl,
        venueId: venueId,
        customerId: parseInt(localStorage.getItem('partySpace_user')),
      }).then(toggleEdit)
    }
  }

  return (
    <form className='VenueEditForm'>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='name'>Venue Name:</label>
          <input
            type='text'
            name='name'
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
          <label htmlFor='geourl'>Map Url:</label>
          <input
            type='text'
            name='geourl'
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
          Save Venue
        </button>
      </div>
    </form>
  )
}
