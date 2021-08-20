import { commonMiddleware, lambdaHandler } from '../lib'
import Redis from 'ioredis'

var client

if (typeof client === 'undefined') {
  var client = new Redis({
    port: 32595,
    host: 'eu1-thorough-possum-32595.upstash.io',
    password: '4c2bfea6684c41ca9bab7ba544bd5376',
    tls: {}
  })
}

const main = lambdaHandler(async (event, context) => {
  // Gets kinesis records from event object
  // Uses custom helper function to get event and convert from base64 to json
  const result = await client.hvals('posts')

  console.log('redis hvals result: ', result)

  return result
})

export const handler = commonMiddleware(main)
