import { coreMiddleware, dynamoDb, createError, TableName } from "../lib"
import { useGetAuction } from "../hooks"

const placeBid = async (event, context) => {
  const { id } = event.pathParameters
  const { amount } = event.body

  const auction = await useGetAuction(id)

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `Your bid must be higher than ${auction.highestBid.amount}`
    )
  }

  const params = {
    TableName,
    Key: { id },
    UpdateExpression: "set highestBid.amount = :amount",
    ExpressionAttributeValues: {
      ":amount": amount,
    },
    ReturnValues: "ALL_NEW",
  }

  let updatedAuction

  try {
    const result = await dynamoDb.update(params).promise()
    updatedAuction = result.Attributes
  } catch (error) {
    console.error(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(updatedAuction),
  }
}

// lambda middleware
export const handler = coreMiddleware(placeBid)
