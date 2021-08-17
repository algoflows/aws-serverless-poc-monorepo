import React from 'react'
import UserLayout from '../../../../layouts/user'
import { useForm } from 'react-hook-form'
import { useUser } from '@auth0/nextjs-auth0'
import { DevTool } from '@hookform/devtools'

export default function Logbooks() {
  const { user } = useUser()
  const {
    register,
    control,
    handleSubmit,
    formState: { error }
  } = useForm()

  const onSubmit = async (data) => {
    const newEntry = {
      ...data,
      userId: user.sub,
      company: data.company.toLowerCase(),
      client: data.client.toLowerCase(),
      country: data.country.toLowerCase(),
      userVerifierId: data.userVerifierId.toLowerCase()
    }

    console.log(newEntry)

    try {
      const response = await fetch('/api/logbook/diving/diver/create-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      })

      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="px-20 py-12 mt-6">
      <DevTool control={control} /> {/* set up the dev tool */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-10 py-10 space-y-8 border-gray-700 divide-y divide-gray-200 shadow-lg rounded-xl"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-blue-400">ADD ENTRY</h3>
              <p className="max-w-2xl mt-1 text-sm text-yellow-400">Fill in all required fields.</p>
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

                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="flex max-w-lg">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            {...register('entryType', { required: true })}
                            type="radio"
                            className="form-radio"
                            name="entryType"
                            value="air"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 ">AIR</span>
                        </label>
                      </div>
                      <span className="mx-10"></span>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            {...register('entryType', { required: true })}
                            type="radio"
                            className="form-radio"
                            name="entryType"
                            value="sat"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 ">SAT</span>
                        </label>
                      </div>
                    </div>
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
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="flex max-w-lg">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            {...register('subTypeA', { required: true })}
                            type="radio"
                            className="form-radio"
                            name="subTypeA"
                            value="inshore"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 ">INSHORE</span>
                        </label>
                      </div>
                      <span className="mx-5"></span>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            {...register('subTypeA', { required: true })}
                            type="radio"
                            className="form-radio"
                            name="subTypeA"
                            value="offshore"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">OFFSHORE</span>
                        </label>
                      </div>
                    </div>
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
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="company"
                    autoComplete="company"
                    {...register('company', { required: true })}
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                  />
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
                  <input
                    type="text"
                    name="client"
                    autoComplete="organization"
                    {...register('client', { required: true })}
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                  />
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
                  <input
                    type="text"
                    name="location"
                    autoComplete="street-address"
                    {...register('location', { required: true })}
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Country
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    name="country"
                    autoComplete="country"
                    {...register('country', { required: true })}
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                  >
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Holland</option>
                    <option>Germany</option>
                    <option>Italy</option>
                    <option>France</option>
                    <option>Spain</option>
                    <option>Sweden</option>
                    <option>Denmark</option>
                    <option>Finland</option>
                    <option>Norway</option>
                    <option>Switzerland</option>
                    <option>Belgium</option>
                    <option>Netherlands</option>
                    <option>Austria</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>Japan</option>
                    <option>China</option>
                    <option>India</option>
                    <option>South Korea</option>
                    <option>Russia</option>
                    <option>Brazil</option>
                    <option>Spain</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>Nigeria</option>
                    <option>South Africa</option>
                  </select>
                </div>
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
                      Depth <span className="text-gray-400 "> - (meters)</span>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="number"
                        name="depthMeters"
                        autoComplete="number"
                        {...register('depthMeters', { required: true })}
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
                        name="leftSurface"
                        autoComplete="left-surface"
                        {...register('leftSurface', { required: true })}
                        className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Bottom Time <span className="text-gray-400 "> - (minutes)</span>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="number"
                        name="bottomTime"
                        autoComplete="bottom-time"
                        {...register('bottomTime', { required: true })}
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
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="time"
                        name="arrivedSurface"
                        autoComplete="arrived-surface"
                        {...register('arrivedSurface', { required: true })}
                        className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Table <span className="text-gray-400 "> - (decompression schedule)</span>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="table"
                        autoComplete="table"
                        {...register('table', { required: true })}
                        className="block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
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
                        autoComplete="mixture"
                        {...register('mixture', { required: true })}
                        className="block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
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
                            Type
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="max-w-lg">
                            <p className="text-sm text-gray-500">What kind of dive was this mainly?</p>
                            <div className="mt-4 space-y-4">
                              <div className="flex items-center">
                                <input
                                  {...register('subTypeB', {
                                    required: true
                                  })}
                                  type="radio"
                                  name="subTypeB"
                                  value="construction"
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
                                  {...register('subTypeB', {
                                    required: true
                                  })}
                                  type="radio"
                                  name="subTypeB"
                                  value="inspection"
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
                                  {...register('subTypeB', { required: true })}
                                  type="radio"
                                  name="subtypeB"
                                  value="salvage"
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
                        name="details"
                        rows={3}
                        {...register('details', { required: true })}
                        className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        defaultValue={''}
                      />
                      <p className="mt-2 text-sm text-gray-500">Further details about the entry (optional)</p>
                    </div>
                  </div>

                  {/* PHOTO UPLOAD SECTION*/}
                  {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Photo / Evidence <p className="mt-2 text-sm text-gray-500">(optional)</p>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div> */}

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
                          type="email"
                          name="userVerifierId"
                          autoComplete="email"
                          {...register('userVerifierId', { required: true })}
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
              By confirming you the active will be signing this recorded entry and our system will
              automatically notify the supervisor to validate this records authenticity.
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
      </form>
    </div>
  )
}

Logbooks.Layout = UserLayout
