import { dynamoDb, TableName } from "../lib"

export async function closeAuction(auction) {
  const params = {
    TableName,
    Key: { id: auction.id },
    UpdateExpression: "set #status = :status",
    ExpressionAttributeValues: {
      ":status": "CLOSED",
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  }

  const result = await dynamoDb.update(params).promise()

  return result
}
