import React, { useContext, useRef } from 'react'
import { PeopleContext } from './PeopleProvider'
import './People.css'

export default ({ PartySpaceClicked, toggler }) => {
  const { peoples, addPeople } = useContext(PeopleContext)
  const userId = parseInt(localStorage.getItem('partySpace_user'))

  const name = useRef()
  const email = useRef()
  // const person = useRef()

  const constructNewPeople = () => {
    if (peoples === 0) {
      window.alert('Please select a person')
    } else {
      addPeople({
        name: name.current.value,
        email: email.current.value,
        partySpaceId: PartySpaceClicked,
        userId: userId,
      }).then(toggler)
    }
  }

  return (
    <form className='peopleForm'>
      {/* <h2 className='peopleForm__title'>New People</h2> */}
      <fieldset>
        <div className='form-group'>
          <label htmlFor='name'>Person name:</label>
          <input
            type='text'
            id='name'
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
          <label htmlFor='email'>Enter Email:</label>
          <input
            type='email'
            id='email'
            ref={email}
            required
            autoFocus
            className='form-control'
            placeholder='People Email'
          />
        </div>
      </fieldset>
      <button
        type='submit'
        onClick={(evt) => {
          evt.preventDefault() // Prevent browser from submitting the form
          constructNewPeople()
        }}
        className='btn ps-button ps-green marTQ float-right'
      >
        Save
      </button>
    </form>
  )
}
