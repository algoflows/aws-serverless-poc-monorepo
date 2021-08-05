import { lambdaHandler, dynamodb, commonMiddleware } from '../../../lib'
// import validator from "@middy/validator"

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

const main = lambdaHandler(async (event, context) => {
  const { userId, entryId } = event.pathParameters

  console.log(userId, entryId)

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Key: {
      PK: `userId#${userId}`,
      SK: `diveId#${entryId}`
    },
    ReturnValues: 'ALL_OLD'
  }

  const result = await dynamodb.delete(params)

  console.log('result checker', result)

  return result
})

// const schema = {
//   type: "object",
//   properties: {
//     pathParameters: {
//       type: "object",
//       properties: {
//         id: {
//           type: "string",
//         },
//       },
//       required: ["id"],
//     },
//   },
//   required: ["pathParameters"],
// }

// exported lambda handler func with middleware
export const handler = commonMiddleware(main)
