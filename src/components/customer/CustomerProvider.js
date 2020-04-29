import React, { useEffect, useState } from 'react'

/*
    The context is imported and used by individual components
    that need data
*/
export const CustomerContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState([])

  const getCustomers = () => {
    return fetch('http://localhost:8088/customers')
      .then((res) => res.json())
      .then(setCustomers)
  }

  const addCustomer = (customer) => {
    return fetch('http://localhost:8088/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    }).then(getCustomers)
  }

  /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getCustomers()
  }, [])

  useEffect(() => {
    console.log('****  CUSTOMER APPLICATION STATE CHANGED  ****')
  }, [customers])

  return (
    <CustomerContext.Provider
      value={{
        customers,
        addCustomer,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  )
}
