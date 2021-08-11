import React from 'react'
import Image from 'next/image'
import UserLayout from '../../../layouts/user'
import homefeed0 from '/public/images/homefeed2.jpg'
import homefeed1 from '/public/images/homefeed1.jpg'

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-x-hidden">
        <div className="p-10">
          <div className="max-w-sm overflow-hidden rounded shadow-lg">
            <Image width="420" height="320" className="w-full" src={homefeed1} alt="Mountain" />
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold">Saturation</div>
              <p className="text-base text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                #Offshore
              </span>
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                #Nigeria
              </span>
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                <div id="Saturation">#Saturation</div>
              </span>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="max-w-sm overflow-hidden rounded shadow-lg">
            <Image width="420" height="320" className="w-full" src={homefeed0} alt="Mountain" />
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold">Wet Welding</div>
              <p className="text-base text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
                perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                #Offshore
              </span>
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                #Nigeria
              </span>
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                <div id="Saturation">#Saturation</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Home.Layout = UserLayout
