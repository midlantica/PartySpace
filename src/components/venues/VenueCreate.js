import React, { useContext, useRef } from 'react'
// import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'

export const VenueCreate = ({ toggler, PartySpaceClicked }) => {
  // const userId = parseInt(localStorage.getItem('partySpace_user'))
  const { venues, addVenue } = useContext(VenueContext)
  const { addPartySpaceVenue } = useContext(PartySpaceVenuesContext)

  // const order = 1

  const name = useRef()
  const geourl = useRef()
  const duration = useRef()

  const createVenue = () => {
    addVenue({
      name: name.current.value,
      geourl: geourl.current.value,
    }).then(createPartySpaceVenue)
  }

  const createPartySpaceVenue = () => {
    // console.log(venues)

    const foundVenue = venues.filter(
      (myVenue) => myVenue.name === name.current.value,
    )

    addPartySpaceVenue({
      // order: order + 1,
      duration: duration.current.value,
      partySpaceId: PartySpaceClicked,
      venueId: foundVenue.id
    })
  }

  return (
    <form className='VenueCreateForm'>
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
            ref={name}
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
            ref={geourl}
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
            ref={duration}
          />
        </div>
      </fieldset>

      <div className='flexRow just-flex-end'>
        <button
          type='submit'
          className='btn ps-button ps-green marTQ'
          onClick={(evt) => {
            evt.preventDefault()
            createVenue()
            toggler()
          }}
        >
          Add Venue
        </button>
      </div>
    </form>
  )
}
