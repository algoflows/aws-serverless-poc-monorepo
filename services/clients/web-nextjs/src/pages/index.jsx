import Head from 'next/head'
import Image from 'next/image'
import { useQuery } from 'react-query'
import axios from 'axios'
import Hero from '../components/landing/hero'
import Carousel from '../components/logo-carousel'
import Spacer from '../components/spacer'

export default function Home() {
  // const { isLoading, error, data } = useQuery("todos", () =>
  //   axios(`https://jsonplaceholder.typicode.com/todos/`)
  // )

  return (
    <div className="">
      <Head>
        <title>OPSAP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <Hero />
        <Spacer />
        <Carousel />
      </main>
    </div>
  )
}
