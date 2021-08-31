import React from 'react'
import UserLayout from '../../../../layouts/user'
import EntryItem from '../../../../components/logbook/entry-item'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Loader from '../../../../components/loaders'
import {sortedByDate} from "../../../../utils/sortedbyDate";
import {motion} from "framer-motion";
import dayjs from "dayjs";

const ulVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.03
    }
  },
  // exit: {
  //   transition: {
  //     staggerChildren: 0.05,
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
      duration: 1,
      ease: [0.48, 0.15, 0.25, 0.96]
    }
  },
  // exit: {
  //   scale: 0.9,
  //   y: 50,
  //   x: 50,
  //   opacity: 0,
  //   transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
  // }
}

export default function Logbook({ssrData}) {
  const {
    query: { userId }
  } = useRouter()

  const fetchEntries = async () => {
    return await (
      await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entries/${encodeURI(userId)}`)
    ).json()
  }

  let { isLoading, data, error } = useQuery('get-entries', fetchEntries)

  if (isLoading) return <Loader size={100} loading={true} />
  if (error) return <span>Error: {error.message}</span>

  data = sortedByDate(data.Items || ssrData.Items)

  return (
    <div className="px-20 py-12 mt-6">
      <div className="overflow-hidden bg-white shadow sm:rounded-md border border-gray-200">
        <motion.ul initial="initial" animate="enter" exit="exit" variants={ulVariants} className="divide-y  divide-gray-200">
          {data.map((data, i) => (
            <motion.li variants={liVariants} className="cursor-pointer divide-y divide-gray-200" key={i}>
              <EntryItem entry={data} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const {userId} = context.params

  const res = await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entries/${encodeURI(userId)}`)
  const ssrData = await res.json()

  return {
    props: { ssrData }, // will be passed to the page component as props
  }

}

Logbook.Layout = UserLayout
