import { dynamodb } from '../lib'

export const DIVE_DIVER_TABLE = process.env.DIVE_DIVER_TABLE

export async function getEndedAuctions() {
  const now = new Date()

  const params = {
    TableName: DIVE_DIVER_TABLE,
    IndexName: 'statusEndDate',
    KeyConditionExpression: '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status': 'OPEN',
      ':now': now.toISOString(),
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  }

  const result = await dynamodb.query(params).promise()
  return result.Items
}
