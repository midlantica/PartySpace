import React, { useContext, useRef, useState } from 'react'
import { PeopleContext } from './PeopleProvider'
import './People.css'

export default ({ PartySpaceClicked, toggler, selectedPerson }) => {
  const { peoples, editPeople } = useContext(PeopleContext)
  const userId = parseInt(localStorage.getItem('partySpace_user'))

  const [updatedPerson, setPerson] = useState(selectedPerson)

  const name = useRef()
  const email = useRef()
  // const person = useRef()

  const updatePeople = () => {
    if (peoples === 0) {
      window.alert('Please select a person')
    } else {
      editPeople({
        id: updatedPerson.id,
        name: updatedPerson.name,
        email: updatedPerson.email,
        partySpaceId: PartySpaceClicked,
        userId: userId,
      }).then(toggler)
    }
  }

  const handleControlledInputChange = (event) => {
    // Create a new copy of the person being edited
    const newPerson = Object.assign({}, updatedPerson)

    // Change the property value on the copy
    newPerson[event.target.name] = event.target.value

    // Set the copy as the new state
    setPerson(newPerson)
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
            name='name'
            defaultValue={selectedPerson.name}
            ref={name}
            required
            autoFocus
            className='form-control'
            placeholder='People name'
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='email'>Enter Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            defaultValue={selectedPerson.email}
            ref={email}
            required
            autoFocus
            className='form-control'
            placeholder='People Email'
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button
        type='submit'
        onClick={(evt) => {
          evt.preventDefault() // Prevent browser from submitting the form
          updatePeople()
        }}
        className='btn ps-button float-right mar0'
      >
        Save
      </button>
    </form>
  )
}
