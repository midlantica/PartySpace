import React, { useContext, useRef } from 'react'
import { PeopleContext } from './PeopleProvider'
import './People.css'

export default (props) => {
  const { addPeople } = useContext(PeopleContext)
  const { peoples } = useContext(PeopleContext)

  const name = useRef()
  const email = useRef()
  // const person = useRef()

  const constructNewPeople = () => {
    const peoples = peoples.current.value

    if (peoples === 0) {
      window.alert('Please select a person')
    } else {
      addPeople({
        name: name.current.value,
        peoples: peoples,
      }).then(props.toggler)
    }
  }

  return (
    <form className='peopleForm'>
      {/* <h2 className='peopleForm__title'>New People</h2> */}
      <fieldset>
        <div className='form-group'>
          <label htmlFor='peopleName'>Person name:</label>
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
            type='text'
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
        className='btn ps-button float-right mar0'
      >
        Save
      </button>
    </form>
  )
}
