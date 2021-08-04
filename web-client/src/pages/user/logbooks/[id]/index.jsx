import React from "react"
import { useRouter } from "next/router"
import UserLayout from "../../../../components/layouts/user"

export default function Diving() {
  const router = useRouter()
  const { id } = router.query

  console.log(id)
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 capitalize">Diving</h1>
    </div>
  )
}

Diving.Layout = UserLayout
