import { dynamoDb, TableName, createError } from "../lib"

export async function useGetAuction(id) {
  let auction

  try {
    const result = await dynamoDb
      .get({
        TableName,
        Key: { id },
      })
      .promise()

    auction = result.Item
  } catch (error) {
    console.error(error)
    throw new createError.InternalServerError(error)
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with ID "${id}" not found`)
  }

  return auction
}
