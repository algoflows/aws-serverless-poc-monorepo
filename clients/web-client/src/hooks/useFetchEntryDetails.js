import React, { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { fetchMachine } from '../machines/fetchMachine'

const fetcher = async (userId, entryId) => {
  return await (
    await fetch(`https://dev-api.opsap.com/logbook/diving/diver/get-entry/${encodeURI(userId)}/${entryId}`)
  ).json()
}

export const useFetchEntryDetails = (userId, entryId) => {
  useEffect(() => {
    sendToFetchMachine({ type: 'FETCH' })
  }, [])

  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    devTools: true,
    actions: {
      fetchData: async (ctx, event) => {
        try {
          const result = await fetcher(userId, entryId)
          sendToFetchMachine({ type: 'RESOLVE', result: result })
        } catch (error) {
          sendToFetchMachine({ type: 'REJECT', message: error })
        }
      }
    }
  })

  return { fetchState, sendToFetchMachine }
}