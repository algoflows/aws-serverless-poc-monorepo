import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useUser } from '@auth0/nextjs-auth0'
import opsapLogo from '/public/opsap6-white-final.png'
import Breadcrumbs from 'nextjs-breadcrumbs'
import 'nextjs-breadcrumbs/dist/index.css'
import Footer from '../../components/footer'

const navigation = ['Home', 'Profile', 'Logbook']
const profile = ['Your Profile', 'Settings', 'Sign out']

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserLayout({ children }) {
  const { user, error, isLoading } = useUser()
  if (isLoading) return <span>''</span>
  if (error) return <div>{error.message}</div>
  return (
    <div className="flex flex-col h-screen max-w-890px">
      <Disclosure as="nav" className="bg-gradient-to-r from-gray-800 to-blue-700">
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-25 h-25">
                    <Link href="/">
                      <a>
                        <Image width="150" height="35" src={opsapLogo} alt="opsap logo" />
                      </a>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-baseline ml-10 space-x-4">
                      {/* Current: "bg-blue-700 text-white", Default: "text-white hover:bg-blue-500 hover:bg-opacity-75" */}
                      <Link href={`/user/feed`}>
                        <a className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-500 hover:bg-opacity-75">
                          Feed
                        </a>
                      </Link>
                      <Link href={`/user/profile/${user.sub}`}>
                        <a className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-500 hover:bg-opacity-75">
                          Profile
                        </a>
                      </Link>

                      <Link href={`/user/logbook/entry`}>
                        <a className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-500 hover:bg-opacity-75">
                          Entry
                        </a>
                      </Link>

                      <Link href={`/user/logbook/history/${user.sub}`}>
                        <a className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-500 hover:bg-opacity-75">
                          History
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    <button className="p-1 text-blue-200 bg-blue-500 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="flex items-center max-w-xs text-sm bg-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <Image
                                className="w-8 h-8 rounded-full"
                                width="35"
                                height="35"
                                src={user ? user.picture : ''}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {profile.map((item) => (
                                <Menu.Item key={item}>
                                  {({ active }) => (
                                    <a
                                      href={item === 'Sign out' ? '/api/auth/logout' : '#'}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="flex -mr-2 md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-blue-200 bg-blue-600 rounded-md hover:text-white hover:bg-blue-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <Fragment key={item}>
                      {/* Current: "bg-blue-700 text-white", Default: "text-white hover:bg-blue-500 hover:bg-opacity-75" */}
                      <a
                        href="#"
                        className="block px-3 py-2 text-base font-medium text-white bg-blue-700 rounded-md"
                      >
                        {item}
                      </a>
                    </Fragment>
                  ) : (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-500 hover:bg-opacity-75"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-blue-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-8 h-8 rounded-full"
                      width="50"
                      height="50"
                      src={user.picture}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.nickname}</div>
                    <div className="text-sm font-medium text-blue-300">{user.email}</div>
                  </div>
                  <button className="flex-shrink-0 p-1 ml-auto text-blue-200 bg-blue-600 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  {profile.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-500 hover:bg-opacity-75"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow-sm">
        <div className="flex px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">Dashboard</h1>
          {false && <Breadcrumbs omitRootLabel />}
        </div>
      </header>
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl">
          {children}
          <div className="sm:px-0"></div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
