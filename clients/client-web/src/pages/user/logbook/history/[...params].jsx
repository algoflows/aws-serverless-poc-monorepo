import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import UserLayout from '../../../../components/layouts/user'
import { useUser } from '@auth0/nextjs-auth0'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Logbook() {
  const { user, isLoading, error } = useUser()
  const router = useRouter()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  console.log(router.query)

  const results = [
    {
      diveType: 'AIR',
      sector: 'Offshore',
      role: 'CONSTRUCTION',
      company: 'Hydrodive',
      country: 'Nigeria',
      email: 'ricardo.cooper@example.com',
      profilePicture: user.picture,
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'unverified',
      href: '#'
    },
    {
      diveType: 'AIR',
      sector: 'Offshore',
      role: 'CONSTRUCTION',
      company: 'Hydrodive',
      country: 'Nigeria',
      email: 'ricardo.cooper@example.com',
      profilePicture: user.picture,
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'unverified',
      href: '#'
    },

    {
      diveType: 'AIR',
      sector: 'Offshore',
      role: 'INSPECTION',
      company: 'Hydrodive',
      country: 'Germany',
      email: 'ricardo.cooper@example.com',
      profilePicture: user.picture,
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'unverified',
      href: '#'
    },

    {
      diveType: 'AIR',
      sector: 'Offshore',
      role: 'INSPECTION',
      company: 'Hydrodive',
      country: 'Germany',
      email: 'ricardo.cooper@example.com',
      profilePicture: user.picture,
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'unverified',
      href: '#'
    },
    {
      diveType: 'AIR',
      sector: 'Offshore',
      role: 'CONSTRUCTION',
      company: 'Hydrodive',
      country: 'Nigeria',
      email: 'ricardo.cooper@example.com',
      profilePicture: user.picture,
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'unverified',
      href: '#'
    },
    {
      diveType: 'AIR',
      sector: 'Offshore',
      role: 'CONSTRUCTION',
      company: 'Hydrodive',
      country: 'Nigeria',
      email: 'ricardo.cooper@example.com',
      profilePicture: user.picture,
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'unverified',
      href: '#'
    },

    {
      diveType: 'AIR',
      sector: 'Offshore',
      role: 'INSPECTION',
      company: 'Hydrodive',
      country: 'Germany',
      email: 'ricardo.cooper@example.com',
      profilePicture: user.picture,
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'unverified',
      href: '#'
    },

    {
      diveType: 'AIR',
      sector: 'Offshore',
      role: 'INSPECTION',
      company: 'Hydrodive',
      country: 'Germany',
      email: 'ricardo.cooper@example.com',
      profilePicture: user.picture,
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'unverified',
      href: '#'
    }
  ]

  return (
    <div className="px-5 py-5">
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {results.map((entry, i) => (
            <li key={i}>
              <a href={entry.href} className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <Image
                        width={55}
                        height={55}
                        className="w-12 h-12 rounded-full"
                        src={entry.profilePicture}
                        alt="profile pic"
                      />
                    </div>
                    <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {entry.diveType} - {entry.role}
                        </p>
                        <p className="flex items-center mt-2 text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
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
                          {entry.company}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
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
                          {entry.sector}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
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
                          <span className="truncate">{entry.country}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            Logged: <time dateTime={entry.date}>{entry.dateFull}</time>
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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Logbook.Layout = UserLayout
