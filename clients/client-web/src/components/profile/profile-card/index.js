import Image from 'next/image'
import ProfileCarousel from '../profile-carousel'
import profileTitleImage from '/public/images/profile-title-image.png'

export default function ProfileCard({ user }) {
  return (
    <>
      <div className="relative container pb-2 pt-20 px-8 overflow-hidden">
        <Image
          layout="fill"
          objectFit="cover"
          className="absolute top-1 filter brightness-50 left-0 w-full h-24 object-cover rounded-t-lg"
          src={profileTitleImage}
          alt="background"
        />
        <div className="relative w-full pt-21  object-cover flex items-end">
          <Image width={90} height={90} className="rounded-xl " src={user.picture} />
          <span className="ml-6 font-semibold text-3xl text-white">Sean Knowles</span>
          <button className="ml-5 mb-1 text-white font-semibold px-4 border border-green-500 rounded-lg">
            Available
          </button>
        </div>
      </div>
      <div className="container h-81 rounded-b-lg flex flex-col justify-between shadow-md">
        <div className="h-33">
          <div className="pl-9 py-4 text-sm font-semibold text-lg ">Companies Worked For</div>
          <div className="px-4">
            <ProfileCarousel />
          </div>
        </div>
        <div className="p-5 flex-grow">
          <div className="border-t h-full flex items-center justify-around">
            <div className="w-4/5 p-3 col-span-3">
              <div className="font-semibold text-lg mb-4">Diver Bio</div>
              <div className="text-sm font-light text-gray-501">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci explicabo id incidunt iure
                nobis quia ratione rem similique suscipit? Ad alias commodi, consectetur cumque deleniti
                incidunt modi nam natus similique. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam asperiores consectetur deleniti dolore ducimus error et facere hic, id iste iusto
                maiores maxime minus optio, pariatur quaerat sed sit vero.
              </div>
            </div>
            <div className="w-2/5 p-3 col-span-1">
              <div className="mb-3">
                <span className="font-semibold text-lg">Details</span>
              </div>
              <div className="flex mb-2">
                <h2 className="text-sm font-semibold text-blue-400">
                  Nearest Airport: <span className="text-yellow-400">LHR HEATHROW</span>
                </h2>
              </div>
              <div className="flex">
                <h2 className="text-sm font-semibold text-blue-400">
                  Phone: <span className="text-yellow-400"> +44 07360 003789</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
