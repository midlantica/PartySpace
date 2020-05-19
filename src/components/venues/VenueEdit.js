import React, { useContext, useRef, useState } from 'react'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'

export const VenueEdit = ({ partySpace, toggler, venue }) => {
  const userId = parseInt(localStorage.getItem('partySpace_user'))
  const { venues, updateVenue } = useContext(VenueContext)
  const { updatePartySpace } = useContext(PartySpaceContext)
  const { updatePartySpaceVenues, partySpaceVenues } = useContext(
    PartySpaceVenuesContext
  )

  const venDur = partySpaceVenues.find(psv => psv.venueId === venue.id)

  // Separate state variable to track the partySpace as it is edited
  const [updatedPartySpaceVenues, setPartySpaceVenues] = useState(venue)

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

  const VenueEditor = () => {
    const venueId = parseInt(updatedPartySpaceVenues.id)


    if (venueId === 0) {
      window.alert('Please select a location')
    } else {
      updateVenue({
        id: updatedPartySpaceVenues.id,
        name: updatedPartySpaceVenues.name,
        geourl: updatedPartySpaceVenues.geourl,
        duration: updatedPartySpaceVenues.duration
      }).then(getPSVensAndIds)
    }
  }

  const getPSVensAndIds = () => {

    const foundPSvenPSid = partySpaceVenues.find(
      (myPSVs) => myPSVs.venueId === updatedPartySpaceVenues.id
    )

    console.log(foundPSvenPSid)

    updatePartySpaceVenues({
      venueId: venue.id,
      order: foundPSvenPSid.order,
      duration: foundPSvenPSid.duration,
      partySpaceId: partySpace.id
    })

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
            defaultValue={venue.name}
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
            defaultValue={venue.geourl}
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
            defaultValue={venDur.duration}
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
            VenueEditor()
            toggler()
          }}
        >
          Save Venue
        </button>
      </div>
    </form>
  )
}
