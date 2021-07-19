import { dynamoDb, TableName } from "../lib"

export async function getEndedAuctions() {
  const now = new Date()

  const params = {
    TableName,
    IndexName: "statusEndDate",
    KeyConditionExpression: "#status = :status AND endingAt <= :now",
    ExpressionAttributeValues: {
      ":status": "OPEN",
      ":now": now.toISOString(),
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  }

  const result = await dynamoDb.query(params).promise()
  return result.Items
}
