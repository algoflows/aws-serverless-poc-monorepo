import Hero from '../components/landing/hero'
import Carousel from '../components/logo-carousel'
import Features from '../components/landing/features'
import Spacer from '../components/spacer'

export default function Home() {
  // const { isLoading, error, data } = useQuery("todos", () =>
  //   axios(`https://jsonplaceholder.typicode.com/todos/`)
  // )

  return (
    <>
      <Hero />
      <Spacer />
      <Carousel />
      <Spacer />
      <Features />
    </>
  )
}
