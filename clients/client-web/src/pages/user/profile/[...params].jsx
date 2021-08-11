import React from 'react'
import { useRouter } from 'next/router'
import UserLayout from '../../../layouts/user'

export default function Profile() {
  const router = useRouter()
  const { id } = router.query

  console.log(id)
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 capitalize">My Profile</h1>
    </div>
  )
}

Profile.Layout = UserLayout
