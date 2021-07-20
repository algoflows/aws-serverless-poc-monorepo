import { coreMiddleware, dynamoDb, createError, TableName } from '../lib'
import validator from '@middy/validator'
import getAuctionsSchema from '../schema/getAuctionsSchema'

const getDives = async (event, context) => {
  const { status } = event.queryStringParameters
  console.log(status)
  let auctions

  const params = {
    TableName,
    IndexName: 'statusEndDate',
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeValues: {
      ':status': status,
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  }

  try {
    const result = await dynamoDb.query(params).promise()
    auctions = result.Items
  } catch (error) {
    console.error(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auctions),
  }
}

// lambda middleware
export const handler = coreMiddleware(getAuctions).use(
  validator({
    inputSchema: getAuctionsSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  }),
)
