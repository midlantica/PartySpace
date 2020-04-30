import React, { useContext, useRef } from 'react'
import { PeopleContext } from './PeopleProvider'
import { VenueContext } from '../venues/VenueProvider'
import './People.css'

export default (props) => {
  const { addPeople } = useContext(PeopleContext)
  const { venues } = useContext(VenueContext)

  const name = useRef()
  const venue = useRef()

  const constructNewPeople = () => {
    const venueId = parseInt(venue.current.value)

    if (venueId === 0) {
      window.alert('Please select a venue')
    } else {
      addPeople({
        name: name.current.value,
        venueId: venueId,
      }).then(props.toggler)
    }
  }

  return (
    <form className='peopleForm'>
      {/* <h2 className='peopleForm__title'>New People</h2> */}
      <fieldset>
        <div className='form-group'>
          <label htmlFor='peopleName'>People name:</label>
          <input
            type='text'
            id='peopleName'
            ref={name}
            required
            autoFocus
            className='form-control'
            placeholder='People name'
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='venue'>Assign to venue:</label>
          <select
            defaultValue=''
            name='venue'
            ref={venue}
            id='peopleVenue'
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
          constructNewPeople()
        }}
        className='btn btn-primary btn-save'
      >
        Save
      </button>
    </form>
  )
}