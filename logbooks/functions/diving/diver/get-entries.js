import { lambdaHandler, dynamodb, commonMiddleware } from "../../../lib"
// import { createSchema } from "./validation"
// import validator from "@middy/validator"

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

const main = lambdaHandler(async (event, context) => {
  const { userId } = event.pathParameters

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Key: {
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
