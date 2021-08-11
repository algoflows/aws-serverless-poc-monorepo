import React from 'react'
import UserLayout from '../../../../layouts/user'
import EntryItem from '../../../../components/logbook/entry-item'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

export default function Logbook() {
  const {
    query: { userId }
  } = useRouter()

  const fetchRecords = async () => {
    return await (
      await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entries/${encodeURI(userId)}`)
    ).json()
  }

  const { isLoading, isError, data, error } = useQuery('get-entries', fetchRecords)

  if (isLoading) return <span>Loading...</span>
  if (isError) return <span>Error: {error.message}</span>

  return (
    <div className="px-20 py-12 mt-6">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {data.Items.map((data, i) => (
            <div onClick={() => console.log('clicked', data.SK)} className="cursor-pointer" key={i}>
              <EntryItem entry={data} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

Logbook.Layout = UserLayout
