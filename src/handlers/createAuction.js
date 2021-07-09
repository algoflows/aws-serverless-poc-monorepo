import { v4 as uuid } from "uuid"
import { coreMiddleware, dynamoDb, createError, TableName } from "../lib"

const createAuction = async (event, context) => {
  const { title } = event.body
  const now = new Date()

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
    highestBid: {
      amount: 0,
    },
  }

  const params = {
    TableName,
    Item: auction,
  }

  try {
    await dynamoDb.put(params).promise()
  } catch (e) {
    console.error(e)
    throw new createError.InternalServerError(e)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(params.Item),
  }
}

// exported lambda handler func with middleware
export const handler = coreMiddleware(createAuction)
