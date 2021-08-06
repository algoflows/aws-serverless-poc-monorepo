import { lambdaHandler, dynamodb, commonMiddleware } from '../../../../packages/api-helpers' // import validator from "@middy/validator"

export const PROFILES_SERVICE_TABLE = process.env.PROFILES_SERVICE_TABLE

const main = lambdaHandler(async (event, context) => {
  const { userId, entryId } = event.pathParameters

  console.log(userId, entryId)

  const params = {
    TableName: PROFILES_SERVICE_TABLE,
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
