import { commonMiddleware, dynamodb, createError } from '../../lib'
import validator from '@middy/validator'
import getAuctionsSchema from '../../schema/getAuctionsSchema'

export const DIVE_DIVER_TABLE = process.env.DIVE_DIVER_TABLE

const getDives = async (event, context) => {
  const { status } = event.queryStringParameters
  console.log(status)
  let auctions

  const params = {
    TableName: DIVE_DIVER_TABLE,
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
    const result = await dynamodb.query(params).promise()
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
export const handler = commonMiddleware(getDives).use(
  validator({
    inputSchema: getAuctionsSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  }),
)
