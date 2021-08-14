/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

export default function Example() {
  return (
    <div className="bg-gradient-to-l opacity-90 from-gray-900 to-blue-900 rounded-2xl">
      <div className="max-w-2xl px-4 py-16 mx-auto text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Safeguard your career history</span>
          <span className="block">Start using OPSAP today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          Be one of the first to join and get a free account for life, that's a promise.
        </p>
        <Link href="api/auth/login">
          <a className="inline-flex items-center justify-center w-full px-5 py-3 mt-8 text-base font-medium text-blue-600 bg-white border border-transparent rounded-md hover:bg-blue-50 sm:w-auto">
            Sign up for free
          </a>
        </Link>
      </div>
    </div>
  )
}
