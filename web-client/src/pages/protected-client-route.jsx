import React, { useEffect, useState } from "react"
import { Auth } from "aws-amplify"
import { useRouter } from "next/router"

/*
	Client with redirect example
*/

export default function ProtectedClient() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => router.push("/profile"))
  }, [])

  if (!user) return null

  return <h1>Hello {user.username} from client route!</h1>
}
