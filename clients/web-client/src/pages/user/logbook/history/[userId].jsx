import React from 'react'
import UserLayout from '../../../../layouts/user'
import EntryItem from '../../../../components/logbook/entry-item'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Loader from '../../../../components/loaders'

export default function Logbook({ssrData}) {
  const {
    query: { userId }
  } = useRouter()

  const fetchEntries = async () => {
    return await (
      await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entries/${encodeURI(userId)}`)
    ).json()
  }

  let { isLoading, data, error } = useQuery('get-entries', fetchEntries)

  if (isLoading) return <Loader size={100} loading={true} />
  if (error) return <span>Error: {error.message}</span>

  data = data || ssrData

  return (
    <div className="px-20 py-12 mt-6">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {data.Items?.map((data, i) => (
            <div className="cursor-pointer" key={i}>
              <EntryItem entry={data} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const {userId} = context.params

  const res = await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entries/${encodeURI(userId)}`)
  const ssrData = await res.json()

  return {
    props: { ssrData }, // will be passed to the page component as props
  }

}

Logbook.Layout = UserLayout
