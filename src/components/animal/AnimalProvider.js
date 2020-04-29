import React, { useEffect, useState } from 'react'

/*
    The context is imported and used by individual components
    that need data
*/
export const AnimalContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const AnimalProvider = (props) => {
  const [animals, setAnimals] = useState([])

  const getAnimals = () => {
    return fetch('http://localhost:8088/animals')
      .then((res) => res.json())
      .then(setAnimals)
  }

  const addAnimal = (animal) => {
    return fetch('http://localhost:8088/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animal),
    }).then(getAnimals)
  }

  const releaseAnimal = (animalId) => {
    return fetch(`http://localhost:8088/animals/${animalId}`, {
      method: 'DELETE',
    }).then(getAnimals)
  }

  const updateAnimal = (animal) => {
    return fetch(`http://localhost:8088/animals/${animal.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animal),
    }).then(getAnimals)
  }

  /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getAnimals()
  }, [])

  useEffect(() => {
    console.log('****  ANIMAL APPLICATION STATE CHANGED  ****')
  }, [animals])

  return (
    <AnimalContext.Provider
      value={{
        animals,
        addAnimal,
        releaseAnimal,
        updateAnimal,
      }}
    >
      {props.children}
    </AnimalContext.Provider>
  )
}
