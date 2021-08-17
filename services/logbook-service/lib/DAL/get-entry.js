import { dynamodb, createError } from '../../lib'

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

export const getEntry = async (userId, entryId, entrySKType) => {
  try {
    const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    KeyConditionExpression: '#DYNOBASE_PK = :pkey and #DYNOBASE_SK = :skey',
    ExpressionAttributeValues: {
      ':pkey': `userId#${decodeURI(userId)}`,
      ':skey': `${entrySKType}#${entryId}`
    },
    ExpressionAttributeNames: {
      '#DYNOBASE_PK': 'PK',
      '#DYNOBASE_SK': 'SK'
    },
    ScanIndexForward: true,
    Limit: 100
  }

  const result = await dynamodb.query(params)

  if (!result) {
    console.log('Record/entry not found')
    throw new createError.NotFoundError('Record/entry not found')
  }

	return result

  } catch (err) {
    console.error(err)
    throw new createError.InternalServerError(err)
  }
}