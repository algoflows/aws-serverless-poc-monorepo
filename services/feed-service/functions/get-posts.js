import { commonMiddleware, lambdaHandler } from '../lib'
import Redis from 'ioredis'

var client

if (typeof client === 'undefined') {
  var client = new Redis({
    port: 11953,
    host: 'redis-11953.c268.eu-west-1-2.ec2.cloud.redislabs.com',
    password: 'S4HSxrTumOcCsCopDqDK0rXrnDfoQ0g4'
  })
}

const main = lambdaHandler(async (event, context) => {
  // Gets kinesis records from event object
  // Uses custom helper function to get event and convert from base64 to json
  let response = await client.hvals('posts')

  const result = response.map((item) => JSON.parse(item))

  console.log('redis hvals result: ', result)

  return result
})

export const handler = commonMiddleware(main)
