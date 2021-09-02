import React, { useEffect } from 'react'
import UserLayout from '../../../layouts/user'
import homefeed1 from '/public/images/homefeed1.jpg'
import Loader from '../../../components/loaders'
import PostItem from '../../../components/feed/post-item'
import { sortedByDate } from '../../../utils/sortedbyDate'
import { motion } from 'framer-motion'
import { useFetchFeed } from '../../../hooks/useFetchFeed'

const ulVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const liVariants = {
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

export default function Home() {
  const { fetchState, sendToFetchMachine } = useFetchFeed()

  useEffect(() => {
    sendToFetchMachine({ type: 'FETCH' })
  }, [])

  if (fetchState.matches('pending')) return <Loader size={100} loading={true} />
  if (fetchState.matches('failed')) return <span>Error: {fetchState.context.message}</span>

  const feed = sortedByDate(fetchState.event.result || [])

  return (
    <>
      <motion.ul initial="initial" animate="enter" exit="exit" variants={ulVariants}>
        {feed.map((post, i) => (
          <motion.li variants={liVariants} key={i}>
            <PostItem
              userProfilePicture={post.userProfilePicture}
              fullName={post.fullName}
              image={post.coverPhoto || homefeed1}
              description={post.details}
              title={post.type}
            />
          </motion.li>
        ))}
      </motion.ul>
    </>
  )
}

Home.Layout = UserLayout
