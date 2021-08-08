import { lambdaHandler, commonMiddleware } from '../../lib'
// import validator from '@middy/validator'
import { v4 as uuid } from 'uuid'
import Redis from 'ioredis'

if (typeof client === 'undefined') {
  var client = new Redis(32532, 'rediss://eu1-moved-sculpin-32532.upstash.io', {
    password: 'a534cf4e4aeb45a39b8be8238c0d8661'
  })
}

const main = lambdaHandler(async (event, context) => {
  console.log('testing testing')

  const now = new Date()

  const data = {
    ...event.body,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  }

  const key = `company:${uuid()}`

  const result = await client.hset(key, data)

  return result
})

// const schema = {
//   type: 'object',
//   properties: {
//     body: {
//       type: 'object',
//       properties: {
//         userId: {
//           type: 'string'
//         },
//         verifierId: {
//           type: 'string'
//         },
//       },
//       required: ['userId', 'verifierId', 'company', 'logType', 'country']
//     }
//   },
//   required: ['body']
// }

// exported lambda handler func with middleware
export const handler = commonMiddleware(main)

// .use(
//   validator({
//     inputSchema: schema,
//     ajvOptions: {
//       useDefaults: true,
//       strict: false
//     }
//   })
// )
