import { lambdaHandler, commonMiddleware } from '../../../lib'
import { getEntry } from '../../../lib/DAL/get-entry'
// import { createSchema } from "./validation"
// import validator from "@middy/validator"

const main = lambdaHandler(async (event, context) => {
  const { userId, entryId } = event.pathParameters

  const result = await getEntry(userId, entryId, 'diveId')

  return result
})

// exported lambda handler func with middleware
export const handler = commonMiddleware(main)

// .use(
//   validator({
//     inputSchema: createSchema,
//     ajvOptions: {
//       useDefaults: true,
//       strict: false,
//     },
//   })
// )
