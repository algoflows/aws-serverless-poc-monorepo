import { lambdaHandler, dynamodb, commonMiddleware } from '../../../../packages/api-helpers'
// import { createSchema } from "./validation"
// import validator from "@middy/validator"

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

const main = lambdaHandler(async (event, context) => {
  const { userId, entryId } = event.pathParameters

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    KeyConditionExpression: '#DYNOBASE_PK = :pkey and #DYNOBASE_SK = :skey',
    ExpressionAttributeValues: {
      ':pkey': `userId#${userId}`,
      ':skey': `diveId#${entryId}`
    },
    ExpressionAttributeNames: {
      '#DYNOBASE_PK': 'PK',
      '#DYNOBASE_SK': 'SK'
    },
    ScanIndexForward: true,
    Limit: 100
  }

  const result = await dynamodb.query(params)

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
