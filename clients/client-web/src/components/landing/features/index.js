import { CheckIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Invite team members',
    description: 'You can manage phone, email and chat conversations all from a single mailbox.'
  },
  {
    name: 'List view',
    description: 'You can manage phone, email and chat conversations all from a single mailbox.'
  },
  {
    name: 'Keyboard shortcuts',
    description: 'You can manage phone, email and chat conversations all from a single mailbox.'
  },
  {
    name: 'Calendars',
    description: 'You can manage phone, email and chat conversations all from a single mailbox.'
  },
  {
    name: 'Notifications',
    description: 'Find what you need with advanced filters, bulk actions, and quick views.'
  },
  { name: 'Boards', description: 'Find what you need with advanced filters, bulk actions, and quick views.' },
  {
    name: 'Reporting',
    description: 'Find what you need with advanced filters, bulk actions, and quick views.'
  },
  {
    name: 'Mobile app',
    description: 'Find what you need with advanced filters, bulk actions, and quick views.'
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
