import { getRecords } from '../lib/kinesis'
import Redis from 'ioredis'
import { nanoid } from 'nanoid'

var client

// USED TO CARRY OVER THE CONNECTION BETWEEN EXECUTIONS
if (typeof client === 'undefined') {
  var client = new Redis({
    port: 11953,
    host: 'redis-11953.c268.eu-west-1-2.ec2.cloud.redislabs.com',
    password: 'S4HSxrTumOcCsCopDqDK0rXrnDfoQ0g4'
  })
}

export async function handler(event, context) {
  const id = nanoid()
  // Gets kinesis records from event object
  // Uses custom helper function to get event and convert from base64 to json
  const records = getRecords(event)
  const createdEntry = records.filter((r) => r.eventType === 'entry-created')

  const entryToSave = createdEntry[0]
  console.log(entryToSave)

  const result = await client.hset('posts', id, JSON.stringify(entryToSave))
  console.log('redis set result: ', result)
}
