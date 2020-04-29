import React, { useState } from 'react'
// ANIMALS
import AnimalList from './animal/AnimalList'
import { AnimalProvider } from './animal/AnimalProvider'
// CUSTOMERS
import CustomerList from './customer/CustomerList'
import { CustomerProvider } from './customer/CustomerProvider'
// EMPLOYEES
import EmployeeList from './employee/EmployeeList'
import { EmployeeProvider } from './employee/EmployeeProvider'
// LOCATIONS
import LocationList from './location/LocationList'
import { LocationProvider } from './location/LocationProvider'
// SEARCH
import { SearchBar } from './search/SearchBar'
import { SearchResults } from './search/SearchResults'

export default () => {
  const [searchTerms, setTerms] = useState()

  return (
    <>
      <address>
        <p className='marB0'>Visit Us at the Nashville North Location</p>
        <p>500 Puppy Way</p>
      </address>
      <hr />

      <AnimalProvider>
        <CustomerProvider>
          <EmployeeProvider>
            <LocationProvider>
              <div className='searchContainer'>
                <SearchBar setTerms={setTerms} />
                <SearchResults searchTerms={searchTerms} />
              </div>
              <div className='dataContainer'>
                <AnimalList />
                <EmployeeList />
                <CustomerList />
                <LocationList />
              </div>
            </LocationProvider>
          </EmployeeProvider>
        </CustomerProvider>
      </AnimalProvider>
    </>
  )
}
