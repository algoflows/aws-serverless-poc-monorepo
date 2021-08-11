import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid'
import dayjs from 'dayjs'

export default function EntryItem({ entry }) {
  const lsTime = dayjs(entry.lsTime)
  console.log(entry)
  return (
    <>
      <Link href={`/user/logbook/entry/details/${entry.userId}/${entry.SK}`} passHref>
        <li className="block hover:bg-gray-50">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-shrink-0">
                {/* <Image
                width="55"
                height="55"
                className="w-12 h-12 rounded-full"
                src={!user ? '' : user.profilePicture}
                alt="profile pic"
              /> */}
              </div>
              <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-300 truncate">
                    AIR - CONSTRUCTION{/* {entry.TYPE} - {entry.role} */}
                  </p>
                  <p className="flex items-center mt-2 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="mr-3 text-yellow-300">{entry.company}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="mr-3 text-yellow-300">Offshore </span>
                    {entry.sector}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-yellow-300 truncate">{entry.country}</span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-500">
                      Date of dive: {lsTime.format('DD-MM-YYYY @ HH:mm')}
                    </p>
                    <p className="flex items-center mt-2 text-sm text-gray-500">
                      <CheckCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      {entry.stage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}
