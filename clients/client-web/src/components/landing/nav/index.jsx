/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0'
import opsapLogo from '/public/opsap6-white-final.png'

const navigation = [
  // { name: 'Users', href: '#' },
  { name: 'Companies', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'News', href: '#' }
]

export default function Example() {
  const { user, error, isLoading } = useUser()
  return (
    <header className="sticky top-0 z-50 drop-shadow-md bg-gradient-to-r from-blue-900 to-blue-600">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between w-full py-3 border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <span className="sr-only">Workflow</span>
            <div className="flex-shrink-0 w-25 h-25">
              <Link href="/">
                <a>
                  <Image width="150" height="35" src={opsapLogo} alt="Workflow" />
                </a>
              </Link>
            </div>

            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {!user ? (
              <a
                href="/api/auth/login"
                className="inline-block px-4 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-opacity-75"
              >
                Sign in
              </a>
            ) : (
              <>
                <a
                  href="/user/feed"
                  className="inline-block px-4 py-2 text-base font-medium text-blue-700 bg-white border border-transparent rounded-md hover:bg-indigo-50"
                >
                  Dashboard
                </a>
                <a
                  href="/api/auth/logout"
                  className="inline-block px-4 py-2 text-base font-medium text-blue-700 bg-white border border-transparent rounded-md hover:bg-indigo-50"
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center py-4 space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
