import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

export default withAuthenticator(function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log('user', user)
      return setUser(user)
    } catch (error) {
      console.error(error)
      return setUser(null)
    }
  }

  return (
    <div>
      {user && <h1>Welcome, {user.username}</h1>}
      <AmplifySignOut />
    </div>
  )
})
