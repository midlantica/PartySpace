import React, { useContext, useRef } from 'react'
import { VenueContext } from '../venues/VenueProvider'
import { PartySpaceContext } from './PartySpaceProvider'

export default (props) => {
  const { venues } = useContext(VenueContext)
  const { addPartySpace } = useContext(PartySpaceContext)

  const name = useRef()
  const venue = useRef()

  const constructNewPartySpace = () => {
    const userId = parseInt(localStorage.getItem('partySpace_user'))
    // create a new partySpace object
    // Make sure that the partySpace object has the userId and venueId foreign keys on it.
    const newPartySpaceObj = {
      name: name.current.value,
      dateStart: dateStart.current.value,
      timeStart: timeStart.current.value,
      description: description.current.value,
    }
    console.log(newPartySpaceObj)
    // and save it to the API.
    addPartySpace(newPartySpaceObj).then(props.toggler)
  }

  return (
    <form className='partySpaceForm'>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='partySpaceName'>PartySpace Name:</label>
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
          <label htmlFor='dateStart'>Date:</label>
          <input
            type='date'
            id='dateStart'
            ref={dateStart}
            required
            autoFocus
            className='form-control'
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='timeStart'>Start Time:</label>
          <input
            type='time'
            id='timeStart'
            ref={timeStart}
            required
            autoFocus
            className='form-control'
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='description'>Event Description:</label>
          <textarea
            rows="5"
            id='description'
            ref={description}
            required
            autoFocus
            className='form-control'
          />
        </div>
      </fieldset>

      <button
        type='submit'
        onClick={(e) => {
          e.preventDefault() // Prevent browser from submitting the form
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
