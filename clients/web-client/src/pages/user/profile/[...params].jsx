import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { motion } from 'framer-motion'
import UserLayout from '../../../layouts/user' // placeholder assets
import Loader from '../../../components/loaders'
import ProfileCard from '../../../components/profile/profile-card'
import LogFrequencyChart from '../../../components/profile/chart-frequency'

const wrapperVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

const elementVariants = {
  initial: { scale: 1.03, x: -50, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96]
    }
  },
  exit: {
    scale: 0.9,
    y: 50,
    x: 50,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
  }
}

export default function Profile() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <Loader />
  if (error) return <div>{error.message}</div>

  return (
    <div className="mt-5">
      <motion.div
        className="container flex flex-col px-10 py-8 mx-auto"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={wrapperVariants}
      >
        <motion.div variants={elementVariants} className="mb-10">
          <ProfileCard user={user} />
        </motion.div>
        <motion.div
          variants={elementVariants}
          className="w-full p-3 border border-gray-100 rounded-lg shadow-md max-h-150 border border-gray-200"
        >
          <h4 className="px-8 pt-5 text-lg font-semibold">Log Frequency</h4>
          <div className="h-96">
            <LogFrequencyChart userId={user.sub} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

Profile.Layout = UserLayout
