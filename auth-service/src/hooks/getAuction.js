import { dynamodb, createError } from '../lib'

export const DIVE_DIVER_TABLE = process.env.DIVE_DIVER_TABLE

export async function getAuction(id) {
  let auction

  try {
    const result = await dynamodb
      .get({
        TableName: DIVE_DIVER_TABLE,
        Key: { id },
      })
      .promise()
    auction = result.Item
  } catch (error) {
    console.error(error)
    throw new createError.InternalServerError(error)
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with ID "${id}" not found!`)
  }
  return auction
}
