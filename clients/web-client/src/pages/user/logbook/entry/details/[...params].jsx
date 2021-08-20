import React from 'react'
import Image from 'next/image'
import UserLayout from '../../../../../layouts/user'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Loader from '../../../../../components/loaders'
import dayjs from 'dayjs'

export default function EntryDetails() {
  const { query } = useRouter()
  const [userId, entryId] = query.params

  const fetchRecords = async () => {
    return await (
      await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entry/${encodeURI(userId)}/${entryId}`)
    ).json()
  }

  const { isLoading, isError, data, error } = useQuery('get-entry', fetchRecords)

  if (isLoading) return <Loader size={100} loading={true} />
  if (isError) return <span>Error: {error.message}</span>

  const entry = data.Items[0]

  const leftSurface = dayjs(entry.leftSurface)
  const arrivedSurface = dayjs(entry.arrivedSurface)

  return (
    <div className="px-20 py-12 mt-6">
      <form className="px-10 py-10 space-y-8 border-gray-700 divide-y divide-gray-200 shadow-lg rounded-xl">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div className="mb-5">
              <h3 className="text-lg font-medium leading-6 text-blue-400">DETAILS</h3>
              <p className="max-w-2xl mt-1 text-sm text-yellow-400">Entry details.</p>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Cover photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex max-w-lg font-semibold">
                  {!entry.coverPhoto && (
                    <span className="text-sm text-gray-400">No images added for this entry...</span>
                  )}
                  {entry.coverPhoto && (
                    <Image width={200} height={150} src={entry.coverPhoto} alt="cover photo" />
                  )}
                </div>
              </div>
            </div>

            {/* ENTRY TYPE AIR/SAT*/}
            <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
              <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Air/Sat
                  </label>

                  <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">
                    {entry.entryType.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* ENTRY TYPE INSHORE/OFFSHORE*/}
            <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
              <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Inshore/Offshore
                  </label>
                  <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">
                    {entry.subTypeA.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* COMPANY*/}
            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Company
                </label>
                <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">{entry.company.toUpperCase()}</div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Client
                </label>
                <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">{entry.client.toUpperCase()}</div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Location <span className="text-gray-400 "> - (vessel or town)</span>
                </label>
                <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">{entry.location.toUpperCase()}</div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Country
                </label>
                <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">{entry.country.toUpperCase()}</div>
              </div>

              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-blue-400">Stats</h3>
                  <p className="max-w-2xl mt-1 text-sm text-yellow-400">Dive times and depth</p>
                </div>
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Depth - (meters)
                    </label>
                    <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">
                      {entry.depthMeters.toUpperCase()}
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Left Surface
                    </label>
                    <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">
                      {leftSurface.format('HH:mm')}
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Bottom Time - (mins)
                    </label>
                    <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">{entry.bottomTime}</div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Arrived Surface
                    </label>
                    <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">
                      {arrivedSurface.format('HH:mm')}
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Table <span className="text-gray-400 "> - (decompression schedule)</span>
                    </label>
                    <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">
                      {entry.table.toUpperCase()}
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Mixture <span className="text-gray-400"> - (breathing gas)</span>
                    </label>
                    <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">
                      {entry.mixture.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-6 divide-y divide-gray-200 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-blue-400">Details</h3>
                  <p className="max-w-2xl mt-1 text-sm text-yellow-400">
                    Additional remarks and important information.
                  </p>
                </div>
                <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
                  <div className="pt-6 sm:pt-5">
                    <div role="group" aria-labelledby="label-notifications">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                        <div>
                          <div
                            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                            id="label-notifications"
                          >
                            Role
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="max-w-lg">
                            <div className="mt-4 space-y-4">
                              <div className="flex items-center font-semibold">
                                {entry.subTypeB.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Details
                    </label>
                    <div className="mt-1 font-semibold sm:mt-0 sm:col-span-2">{entry.details}</div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Supervisor
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex max-w-lg font-semibold">{entry.userVerifierId}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="pt-5">
          <div className="flex items-center justify-end">
            <span className="mr-6 text-gray-400">This dive has not yet been verified</span>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              REQUEST VERIFICATION
            </button>
          </div>
        </div> */}
      </form>
    </div>
  )
}

EntryDetails.Layout = UserLayout
