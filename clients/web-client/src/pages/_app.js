// _app.jsx
import { useState } from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import LandingLayout from '../layouts/landing'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ToastContainer, toast } from 'react-toastify'
// import { AnimatePresence } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps, router }) {
  const [queryClient] = useState(() => new QueryClient())

  const Layout = Component.Layout || LandingLayout

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Head>
            <title>OPSAP - Platform</title>
            <link rel="shortcut icon" href="/opsap-favicon.png" />
          </Head>
          <div className="max-w-5xl mx-auto sm:px-0">
            <Layout>
              {/* AnimatePresence Framer-Motion */}
              {/*<AnimatePresence exitBeforeEnter>*/}
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
                <Component {...pageProps} key={router.route} />
              {/*</AnimatePresence>*/}
            </Layout>
          </div>
        </Hydrate>
      </QueryClientProvider>
    </UserProvider>
  )
}
