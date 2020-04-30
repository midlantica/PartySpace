import React, { useState, useEffect } from 'react'

/*
    The context is imported and used by individual components
    that need data
*/
export const PeopleContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const PeopleProvider = (props) => {
  const [people, setPeoples] = useState([])

  const getPeople = () => {
    return fetch('http://localhost:8088/people')
      .then((res) => res.json())
      .then(setPeoples)
  }

  const addPeople = (employee) => {
    return fetch('http://localhost:8088/people', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    }).then(getPeople)
  }

  const removePeople = (peopleId) => {
    return fetch(`http://localhost:8088/people/${peopleId}`, {
      method: 'DELETE',
    }).then(getPeople)
  }

  /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getPeople()
  }, [])

  useEffect(() => {
    console.log('****  People APPLICATION STATE CHANGED  ****')
  }, [people])

  return (
    <PeopleContext.Provider
      value={{
        people,
        addPeople,
        removePeople,
      }}
    >
      {props.children}
    </PeopleContext.Provider>
  )
}
