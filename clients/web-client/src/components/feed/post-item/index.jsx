import React from 'react'
import Image from 'next/image'

/*
	Props
	Title,
	Image,
	Description
	Tags from subtypes
*/

export default function PostItem({ title, image, description }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-x-hidden">
        <div className="p-10">
          <div className="max-w-sm overflow-hidden rounded shadow-lg">
            <Image width="420" height="320" className="w-full" src={image} alt="Mountain" />
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold">{title}</div>
              <p className="text-base text-gray-700">{description}</p>
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
