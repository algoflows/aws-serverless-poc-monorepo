import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'
import UserLayout from '../../../layouts/user' // placeholder assets
import Loader from '../../../components/loaders'
import ProfileCard from '../../../components/profile/profile-card'
import ProfileCalendar from '../../../components/profile/profile-calendar'

export default function Profile() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  const { id } = router.query

  if (isLoading) return <Loader />
  if (error) return <div>{error.message}</div>

  console.log(user)

  console.log(id)
  return (
    <div className="mt-5">
      <div className="px-10 py-8 flex flex-col container mx-auto">
        <div className="mb-10">
          <ProfileCard user={user} />
        </div>
        <div className="max-h-150 p-3 w-full border border-gray-100 shadow-md rounded-lg">
          <h4 className="pt-5 px-8 font-semibold text-lg">Log Frequency</h4>
          <div className="h-96 ">
            <ProfileCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}


Profile.Layout = UserLayout
