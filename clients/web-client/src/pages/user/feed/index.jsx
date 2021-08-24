import React from 'react'
import UserLayout from '../../../layouts/user'
import homefeed1 from '/public/images/homefeed1.jpg'
import Loader from '../../../components/loaders'
import { useQuery } from 'react-query'
import PostItem from '../../../components/feed/post-item'
import dayjs from 'dayjs'

export default function Home() {
  const fetchPosts = async () => {
    return await (await fetch(`https://dev-api.opsap.com/feed/get-posts`)).json()
  }

  const { isLoading, isError, data, error } = useQuery('get-posts', fetchPosts)

  if (isLoading) return <Loader size={100} loading={isLoading} />
  if (isError) return <span>Error: {error.message}</span>

  const sortedPosts = data.sort((a, b) => {
    return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
  })

  const sortedEntries = data.Items.sort((a, b) => {
    return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
  })

  console.log(sortedEntries)

  return (
    <>
      {sortedPosts.map((post, i) => (
        <PostItem key={i} image={post.coverPhoto || homefeed1} description={post.details} title={post.type} />
      ))}
    </>
  )
}

Home.Layout = UserLayout
