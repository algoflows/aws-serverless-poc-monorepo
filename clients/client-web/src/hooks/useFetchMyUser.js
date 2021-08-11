import React from 'react'

function useFetchMyUser() {
  const fetchUserInfo = async () => {
    setUserLoading(true)
    if (!error && !isLoading && user) {
      try {
        const user = await fetch(`https://dev-opsap.eu.auth0.com/api/v2/users/${user.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`
          }
        })
        console.log('MY USER CONTEXT', user)
        setMyUser(user)
        setUserLoading(false)
      } catch (e) {
        setMyUser(null)
        console.error(e)
        setUserLoading(false)
      }
    }
  }
  return
}

export default useFetchMyUser
