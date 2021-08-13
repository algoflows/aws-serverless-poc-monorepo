import Link from 'next/link'

export default function Example() {
  return (
    <div className="bg-gradient-to-l opacity-90 from-gray-900 to-blue-900 rounded-2xl">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Safeguard your career history</span>
          <span className="block">Start using OPSAP today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          Be one of the first to join and get a free account for life, that's a promise.
        </p>
        <Link href="api/auth/login">
          <a className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto">
            Sign up for free
          </a>
        </Link>
      </div>
    </div>
  )
}