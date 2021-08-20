import { getRecords } from '../lib/kinesis'
import Redis from 'ioredis'
import { nanoid } from 'nanoid'

var client

if (typeof client === 'undefined') {
  var client = new Redis({
    port: 32595,
    host: 'eu1-thorough-possum-32595.upstash.io',
    password: '4c2bfea6684c41ca9bab7ba544bd5376',
    tls: {}
  })
}

export async function handler(event, context) {
  const id = nanoid()
  // Gets kinesis records from event object
  // Uses custom helper function to get event and convert from base64 to json
  const records = getRecords(event)
  const createdEntry = records.filter((r) => r.eventType === 'entry-created')

  const result = await client.hset('posts', id, JSON.stringify(createdEntry))

  console.log('redis set result: ', result)
}
