import Image from 'next/image'
import ProfileCarousel from '../../logo-carousel'
import profileTitleImage from '/public/images/profile-title-image.png'


export default function ProfileCard({ user }) {
  return (
    <>
      <div className="container relative px-8 pt-20 pb-2 overflow-hidden">
        <Image
          layout="fill"
          objectFit="cover"
          className="absolute left-0 object-cover w-full h-24 rounded-t-lg top-1 filter brightness-50"
          src={profileTitleImage}
          alt="background"
        />
        <div className="relative flex items-end object-cover w-full pt-21">
          <Image width={90} height={90} className="rounded-xl " src={user.picture} alt="profile picture" />
          <span className="ml-6 text-3xl font-semibold text-white">{user.name}</span>
          <button className="px-4 mb-1 ml-5 font-semibold text-white border border-green-500 rounded-lg">
            Available
          </button>
        </div>
      </div>
      <div className="container flex flex-col justify-between rounded-b-lg shadow-md h-81 border border-gray-200">
        <div className="h-33">
          <div className="py-4 text-lg font-semibold pl-9 ">Companies Worked For</div>
          <div className="px-4">
            <ProfileCarousel />
          </div>
        </div>
        <div className="flex-grow p-5">
          <div className="flex items-center justify-around h-full border-t">
            <div className="w-4/5 col-span-3 p-3">
              <div className="mb-4 text-lg font-semibold">Diver Bio</div>
              <div className="text-sm font-light text-gray-501">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci explicabo id incidunt iure
                nobis quia ratione rem similique suscipit? Ad alias commodi, consectetur cumque deleniti
                incidunt modi nam natus similique. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam asperiores consectetur deleniti dolore ducimus error et facere hic, id iste iusto
                maiores maxime minus optio, pariatur quaerat sed sit vero.
              </div>
            </div>
            <div className="w-2/5 col-span-1 p-3">
              <div className="mb-3">
                <span className="text-lg font-semibold">Details</span>
              </div>
              <div className="flex mb-2">
                <h2 className="text-sm font-semibold text-blue-400">
                  Nearest Airport: <span className="text-gray-600">LHR HEATHROW</span>
                </h2>
              </div>
              <div className="flex">
                <h2 className="text-sm font-semibold text-blue-400">
                  Phone: <span className="text-gray-600">+44 07360 003789</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
