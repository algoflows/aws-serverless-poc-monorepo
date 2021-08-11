// _app.jsx
import { useState } from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import LandingLayout from '../components/layouts/landing'
import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  const Layout = Component.Layout || LandingLayout

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>OPSAP - Platform</title>
            <link rel="shortcut icon" href="/opsap-favicon.png" />
          </Head>
          <div className="mx-auto sm:px-0 max-w-7xl">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </Hydrate>
      </QueryClientProvider>
    </UserProvider>
  )
}
