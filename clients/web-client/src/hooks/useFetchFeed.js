import React, { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { fetchMachine } from '../machines/fetchMachine'

const fetcher = async () => {
  return await (await fetch(`https://dev-api.opsap.com/feed/get-posts`)).json()
}

export const useFetchFeed = (userId) => {
  useEffect(() => {
    sendToFetchMachine({ type: 'FETCH' })
  }, [])

  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    devTools: true,
    actions: {
      fetchData: async (ctx, event) => {
        try {
          const result = await fetcher(userId)
          sendToFetchMachine({ type: 'RESOLVE', result: result })
        } catch (error) {
          sendToFetchMachine({ type: 'REJECT', message: error })
        }
      }
    }
  })

  return { fetchState, sendToFetchMachine }
}