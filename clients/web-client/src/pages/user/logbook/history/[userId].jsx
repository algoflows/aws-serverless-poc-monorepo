import React, { useEffect } from 'react'
import UserLayout from '../../../../layouts/user'
import EntryItem from '../../../../components/logbook/entry-item'
import { useRouter } from 'next/router'
import Loader from '../../../../components/loaders'
import { sortedByDate } from '../../../../utils/sortedbyDate'
import { motion } from 'framer-motion'
import { useFetchEntries } from '../../../../hooks/useFetchEntries'

const wrapperVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.03
    }
  }
  // exit: {
  //   transition: {
  //     staggerChildren: 0.03
  //   }
  // }
}

const liVariants = {
  initial: { scale: 1.1, y: 90, x: -30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96]
    }
  }
  // exit: {
  //   x: 50,
  //   opacity: 0,
  //   transition: { duration: 0.05, ease: [0.48, 0.15, 0.25, 0.96] }
  // }
}

export default function Logbook({ ssrData }) {
  const { query } = useRouter()
  const { fetchState, sendToFetchMachine } = useFetchEntries(query.userId)

  useEffect(() => {
    sendToFetchMachine({ type: 'FETCH' })
  }, [])

  if (fetchState.matches('pending')) return <Loader size={100} loading={true} />
  if (fetchState.matches('failed')) return <span>Error: {fetchState.context.message}</span>

  const data = sortedByDate(fetchState.event.result?.Items || [])

  return (
    <div className="px-20 py-12 mt-6">
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={wrapperVariants}
        className="overflow-hidden bg-white  sm:rounded-md"
      >
        <motion.ul className="divide-y divide-gray-200 border border-gray-100 rounded-md">
          {data.map((data, i) => (
            <motion.li variants={liVariants} className="cursor-pointer divide-y divide-gray-200" key={i}>
              <EntryItem entry={data} />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { userId } = context.params

  const res = await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entries/${encodeURI(userId)}`)
  const ssrData = await res.json()

  return {
    props: { ssrData } // will be passed to the page component as props
  }
}

Logbook.Layout = UserLayout
