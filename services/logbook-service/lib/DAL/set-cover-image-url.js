import { dynamodb, createError } from '../index'

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

export async function setImageUrl(userId, entryId, imageUrl) {
  try {
    // const now = new Date()
    const params = {
      TableName: LOGBOOK_SERVICE_TABLE,
      Key: {
        "PK": `userId#${userId}`,
        "SK": `diveId#${entryId}`
      },
      UpdateExpression: 'set coverPhoto = :coverPhoto',
      ExpressionAttributeValues: {
        ':coverPhoto': imageUrl,
      },
      ReturnValues: 'ALL_NEW'
    }
    const result = await dynamodb.update(params)

    console.log('result dynamodb update', result)
    return result.Attributes
  } catch (err) {
    console.error(err)
    throw new createError.InternalServerError(err)
  }
}