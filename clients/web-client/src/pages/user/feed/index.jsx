import React, { useEffect, useState } from 'react'
import UserLayout from '../../../layouts/user'
import homefeed1 from '/public/images/homefeed1.jpg'
import Loader from '../../../components/loaders'
import { useQuery } from 'react-query'
import PostItem from '../../../components/feed/post-item'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'

const fetchPosts = async () => {
  return await (await fetch(`https://dev-api.opsap.com/feed/get-posts`)).json()
}

const sortedByDate = (data) =>
  data.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())

const ulVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const liVariants = {
  initial: { scale: 0.9, y: 50, x: -50, opacity: 0 },
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
  const { isLoading, isError, data, error } = useQuery('get-posts', fetchPosts)

  if (isLoading) return <Loader size={100} loading={isLoading} />
  if (isError) return <span>Error: {error.message}</span>

  const feed = sortedByDate(data)

  return (
    <>
      <motion.ul initial="initial" animate="enter" exit="exit" variants={ulVariants}>
        {feed.map((post, i) => (
          <motion.li variants={liVariants} key={i}>
            <PostItem
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
