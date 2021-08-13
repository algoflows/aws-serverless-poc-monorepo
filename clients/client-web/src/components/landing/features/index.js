import { CheckIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Safeguard your career history',
    description: 'Never worry about losing your logbook again.'
  },
  {
    name: 'Build a verifiable track record',
    description: 'Get each dive verified via our cross channel supervisor diver verification system'
  },
  {
    name: 'Track your statistics and progression',
    description: 'See in depth statistics of of your commercial diving history, let us do the maths for you.'
  },
  {
    name: 'Stay informed',
    description:
      'Keep informed on industry news and key industry metrics. Find out which regions of the world pay best.'
  },
  {
    name: 'Notifications',
    description: 'Get alerts when new jobs hit the jobs board so you never miss an opportunity.'
  },
  {
    name: 'Reporting',
    description:
      'More easily fulfil your legal obligation to keep a immutable diving record, we help to make it painless.'
  },
  {
    name: 'Stay in contact with industry',
    description:
      'Our goal is to unify a fragmented industry and bring it into the 21st century with modern tooling.'
  },
  {
    name: 'Mobile app',
    description:
      'Your new logbook is your phone, let it sync with our secure servers to never worry about loss of your career history.'
  }
]

export default function Features() {
  return (
    <div className="bg-white">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-15 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div>
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">All-in-one platform</p>
          <p className="mt-4 text-lg text-gray-500">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel
            nulla nec.
          </p>
        </div>
        <div className="mt-12 lg:mt-0 lg:col-span-2">
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <CheckIcon className="absolute w-6 h-6 text-green-500" aria-hidden="true" />
                  <p className="text-lg font-medium leading-6 text-gray-900 ml-9">{feature.name}</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500 ml-9">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
