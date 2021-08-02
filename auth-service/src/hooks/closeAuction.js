import { dynamodb } from '../lib'
export const DIVE_DIVER_TABLE = process.env.DIVE_DIVER_TABLE

export async function closeAuction(auction) {
  const params = {
    TableName: DIVE_DIVER_TABLE,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  }

  const result = await dynamodb.update(params).promise()

  return result
}
