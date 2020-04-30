import React, { useContext, useRef } from 'react'
import { VenueContext } from '../venues/VenueProvider'
import { PartySpaceContext } from './PartySpaceProvider'

export default (props) => {
  const { venues } = useContext(VenueContext)
  const { addPartySpace } = useContext(PartySpaceContext)

  const name = useRef()
  const venue = useRef()

  const constructNewPartySpace = () => {
    const venueId = parseInt(venue.current.value)
    const userId = parseInt(localStorage.getItem('partySpace_user'))
    // create a new partySpace object
    // Make sure that the partySpace object has the customerId and venueId foreign keys on it.
    const newPartySpaceObj = {
      name: name.current.value,
      venueId: venueId,
      customerId: userId,
    }
    console.log(newPartySpaceObj)
    // and save it to the API.
    addPartySpace(newPartySpaceObj).then(props.toggler)
  }

  return (
    <form className='partySpaceForm'>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='partySpaceName'>Name of PartySpace: </label>
          <input
            type='text'
            id='partySpaceName'
            ref={name}
            required
            autoFocus
            className='form-control'
            placeholder='PartySpace name'
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='venue'>Assign to venue: </label>
          <select
            defaultValue=''
            name='venue'
            ref={venue}
            id='venue'
            className='form-control'
          >
            <option value='0'>Select a venue</option>
            {venues.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type='submit'
        onClick={(evt) => {
          evt.preventDefault() // Prevent browser from submitting the form
          // create the partySpace function goes here
          constructNewPartySpace()
        }}
        className='btn btn-primary btn-save'
      >
        Add PartySpace
      </button>
    </form>
  )
}
