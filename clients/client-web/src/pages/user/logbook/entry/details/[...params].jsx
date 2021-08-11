import React, { useEffect } from 'react'
import UserLayout from '../../../../../layouts/user'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

export default function EntryDetails() {
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
      <div className="px-10 py-10 space-y-8 border-gray-700 divide-y divide-gray-200 shadow-lg rounded-xl">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">ENTRY DETAILS</h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">Fill in all required fields.</p>
            </div>

            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Company
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex max-w-lg rounded-md shadow-sm">{/* <div>Todo</div> */}</div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Client
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex max-w-lg rounded-md shadow-sm">{/* <div>Todo</div> */}</div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Location
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm">
                      vessel/town
                    </span>
                    {/* <div>TODO: TOWN</div> */}
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Country
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">{/* <div>TODO: COUNTRY</div> */}</div>
              </div>

              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Stats</h3>
                  <p className="max-w-2xl mt-1 text-sm text-gray-500">Dive times and depth</p>
                </div>
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Depth (m)
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="number"
                        name="depth-m"
                        id="depth-m"
                        autoComplete="depth-m"
                        className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Left Surface
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="datetime-local"
                        name="left-surface"
                        id="left-surface"
                        autoComplete="left-surface"
                        className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Bottom Time (mins)
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="number"
                        name="bottom-time"
                        id="bottom-time"
                        autoComplete="bottom-time"
                        className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Arrived Surface
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">{/* <div>Todo</div> */}</div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Table <span className="text-gray-400 "> - (decompression schedule)</span>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">{/* <div>Todo</div> */}</div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Mixture <span className="text-gray-400 "> - (breathing gas)</span>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="mixture"
                        id="mixture"
                        autoComplete="mixture"
                        className="block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-6 divide-y divide-gray-200 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Details</h3>
                  <p className="max-w-2xl mt-1 text-sm text-gray-500">
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
                            Type
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="max-w-lg">
                            <p className="text-sm text-gray-500">What kind of dive was this mainly?</p>
                            <div className="mt-4 space-y-4">
                              <div className="flex items-center">
                                <input
                                  id="dive-role"
                                  name="push-notifications"
                                  type="radio"
                                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                  htmlFor="dive-role"
                                  className="block ml-3 text-sm font-medium text-gray-700"
                                >
                                  Construction
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="dive-role"
                                  name="push-notifications"
                                  type="radio"
                                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                  htmlFor="push-email"
                                  className="block ml-3 text-sm font-medium text-gray-700"
                                >
                                  Inspection
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="dive-role"
                                  name="push-notifications"
                                  type="radio"
                                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                  htmlFor="dive-role"
                                  className="block ml-3 text-sm font-medium text-gray-700"
                                >
                                  Salvage
                                </label>
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
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        id="details"
                        name="details"
                        rows={3}
                        className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        defaultValue={''}
                      />
                      <p className="mt-2 text-sm text-gray-500">Further details about the entry (optional)</p>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Supervisor <span className="text-gray-400"> - verifierId</span>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex max-w-lg rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm">
                          Email
                        </span>
                        <input
                          type="text"
                          name="supervisor"
                          id="supervisor"
                          autoComplete="supervisor"
                          className="flex-1 block w-full min-w-0 border-gray-300 rounded-none focus:ring-blue-500 focus:border-blue-500 rounded-r-md sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex items-center justify-end">
            <span className="mr-6 text-gray-400">
              Confirmation will automatically inform the superviser to verifiy this dives authenticity{' '}
            </span>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

EntryDetails.Layout = UserLayout
