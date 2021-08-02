import { coreMiddleware, createError, dynamoDb, TableName } from "../lib"
import placeBidSchema from "../schema/placeBidSchema"

import { getAuction } from "../hooks"
import validator from "@middy/validator"

async function placeBid(event, context) {
  const { id } = event.pathParameters
  const { amount } = event.body

  const auction = await getAuction(id)

  console.log("get auction result from placebid route", auction)

  // // Bid identity validation
  // if (email === auction.seller) {
  //   throw new createError.Forbidden(`You cannot bid on your own auctions!`)
  // }

  // // Avoid double bidding
  // if (email === auction.highestBid.bidder) {
  //   throw new createError.Forbidden(`You are already the highest bidder`)
  // }

  // Auction status validation
  if (auction.status !== "OPEN") {
    throw new createError.Forbidden(`You cannot bid on closed auctions!`)
  }

  // Bid amount validation
  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}!`)
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
    console.log("PARAMS BEFORE UPDATE", params)

    const result = await dynamoDb.update(params).promise()

    console.log("RESULT AFTER UPDATE", result)

    updatedAuction = result.Attributes
  } catch (error) {
    console.error(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  }
}

export const handler = coreMiddleware(placeBid).use(
  validator({
    inputSchema: placeBidSchema,
  })
)