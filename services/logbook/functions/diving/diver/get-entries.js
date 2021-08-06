import { lambdaHandler, dynamodb, commonMiddleware } from '../../../../../packages/api-helpers'
// import validator from "@middy/validator"

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

const main = lambdaHandler(async (event, context) => {
  const { userId } = event.pathParameters
  console.log('userId', userId)

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    KeyConditionExpression: '#DYNOBASE_PK = :pkey',
    ExpressionAttributeValues: {
      ':pkey': `userId#${userId}`
    },
    ExpressionAttributeNames: {
      '#DYNOBASE_PK': 'PK'
    },
    ScanIndexForward: true,
    limit: 100
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
