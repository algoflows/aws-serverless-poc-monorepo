import { lambdaHandler, dynamodb, commonMiddleware } from "../../../lib"
// import { createSchema } from "./validation"
// import validator from "@middy/validator"

export const DIVE_DIVER_TABLE = process.env.DIVE_DIVER_TABLE

const main = lambdaHandler(async (event, context) => {
  const { userId, entryId } = event.pathParameters

  const params = {
    TableName: DIVE_DIVER_TABLE,
    Key: {
      id: entryId,
      userId: userId,
    },
  }

  const result = await dynamodb.get(params)

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
