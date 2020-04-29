import React from 'react'

export const Animal = ({ animal, location, customer }) => (
  <section className='box animal flexColumn'>
    <div className='topFlexBox'>
      <h6 className='animal__name'>{animal.name}</h6>
      <p className='fs-small'>{animal.breed}</p>
      <p className='fs-x-small'>Customer: {customer.name}</p>
      <p className='fs-x-small'>Location: {location.name}</p>
    </div>
  </section>
)
