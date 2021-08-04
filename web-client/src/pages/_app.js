// _app.jsx
import { useState } from "react"
import Head from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import LandingLayout from "../components/layouts/landing"
import "../styles/globals.css"
import Amplify from "aws-amplify"

// TODO: https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource
// REUSE EXISTING BACKEND

Amplify.configure({
  aws_project_region: process.env.REACT_APP_REGION,
  aws_cognito_identity_pool_id: process.env.REACT_APP_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.REACT_APP_REGION,
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_CLIENT_ID,
  oauth: {},
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
  },
  srr: true,
})

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  const Layout = Component.Layout || LandingLayout

  return (
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
  )
}
