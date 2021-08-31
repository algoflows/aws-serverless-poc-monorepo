import React from 'react'
import { useQuery } from 'react-query'
import { useUser } from '@auth0/nextjs-auth0'
import UserLayout from '../../../layouts/user' // placeholder assets
import Loader from '../../../components/loaders'
import ProfileCard from '../../../components/profile/profile-card'
import ProfileCalendar from '../../../components/profile/chart-frequency'
import dayjs from 'dayjs'

export default function Profile() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <Loader />
  if (error) return <div>{error.message}</div>

  return (
    <div className="mt-5">
      <div className="container flex flex-col px-10 py-8 mx-auto">
        <div className="mb-10">
          <ProfileCard user={user} />
        </div>
        <div className="w-full p-3 border border-gray-100 rounded-lg shadow-md max-h-150 border border-gray-200">
          <h4 className="px-8 pt-5 text-lg font-semibold">Log Frequency</h4>
          <div className="h-96">
            <ProfileCalendar userId={user.sub} />
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.Layout = UserLayout
