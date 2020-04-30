import React, { useContext } from 'react'
import User from './User'
import { UserContext } from './UserProvider'

export default () => {
  const { users } = useContext(UserContext)

  return (
    <>
      <div className='flexRow'>
        <h4 className='marRH'>Users</h4>
      </div>

      <div className='gridSection users'>
        {users.map((ven) => (
          <User key={ven.id} user={ven} />
        ))}
      </div>
    </>
  )
}
