import { coreMiddleware, dynamoDb, createError, TableName } from "../lib"

const getAuctions = async (event, context) => {
  let auctions

  try {
    const result = await dynamoDb.scan({ TableName }).promise()
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
export const handler = coreMiddleware(getAuctions)
