import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HoopSpinner } from 'react-spinners-kit'

/*
	Props
	Title,
	Image,
	Description
	Tags from subtypes
*/

let easing = [0.175, 0.85, 0.42, 0.96]

const imageVariants = {
  exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing
    }
  }
}

export default function PostItem({ title, fullName, image, description }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-x-hidden rounded-xl">
        <div className="p-5">
          <motion.div
            whileTap={{ scale: 0.96 }}
            className="max-w-md p-4 overflow-hidden shadow-md cursor-pointer rounded-xl transition- hover:shadow-xl"
          >
            <motion.div whileHover={{ scale: 0.96 }}>
              <Image
                width="420"
                height="320"
                className="w-full rounded-xl"
                src={image}
                alt="opsap news feed post"
              />
            </motion.div>
            <div className="px-6 py-4">
              <p className="font-bold text-md">{fullName}</p>
              <p className="text-sm font-medium text-gray-500">IMCA HSE Part 1</p>
              <div className="mb-2 text-xl font-bold">{title}</div>
              <p className="text-sm text-gray-700">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="text-xs text-blue-600 cursor-pointer">Read More</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
