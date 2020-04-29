import React, { useContext } from 'react'
import Customer from './Customer'
import { CustomerContext } from './CustomerProvider'

export default () => {
  const { customers } = useContext(CustomerContext)

  return (
    <>
      <div className='flexRow'>
        <h4 className='marRH'>Customers</h4>
      </div>

      <div className='gridSection customers'>
        {customers.map((loc) => (
          <Customer key={loc.id} customer={loc} />
        ))}
      </div>
    </>
  )
}
