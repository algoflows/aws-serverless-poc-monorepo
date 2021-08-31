import Head from 'next/head'
import LandingLayout from '../layouts/landing'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ToastContainer, toast } from 'react-toastify'
import { AnimateSharedLayout } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
import { inspect } from '@xstate/inspect'
import { AnimatePresence } from 'framer-motion'

if (typeof window !== 'undefined') {
  inspect({
    /* options */
    url: 'https://statecharts.io/inspect', // (default)
    iframe: false // open in new window
  })
}

export default function MyApp({ Component, pageProps, router }) {
  const Layout = Component.Layout || LandingLayout
  return (
    <UserProvider>
      <Head>
        <title>OPSAP - Platform</title>
        <link rel="shortcut icon" href="/opsap-favicon.png" />
      </Head>
      <div className="max-w-5xl mx-auto sm:px-0">
        <Layout>
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
          {/* AnimatePresence Framer-Motion */}
          <AnimatePresence initial={false} exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </div>
    </UserProvider>
  )
}
