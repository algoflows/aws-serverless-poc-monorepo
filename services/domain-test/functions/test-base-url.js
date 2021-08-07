// import validator from "@middy/validator"

export const handler = async (event, context) => {
  const { userId } = event.pathParameters
  console.log('userId', userId)

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    KeyConditionExpression: '#DYNOBASE_PK = :pkey',
    ExpressionAttributeValues: {
      ':pkey': `userId#${userId}`
    },
    ExpressionAttributeNames: {
      '#DYNOBASE_PK': 'PK'
    },
    ScanIndexForward: true,
    limit: 100
  }

  const result = await dynamodb.query(params)

  return result
}
