import { lambdaHandler, commonMiddleware } from '../../../lib'
import { getEntry, uploadImageToS3, setCoverImageUrl } from '../../../lib/DAL'

export const main = lambdaHandler(async (event, context) => {
  const { userId, entryId } = event.pathParameters

  const response = await getEntry(userId, entryId, 'diveId')
  const entry = response.Items[0]

  const base64 = event.body.replace(/^data:image\/w+;base64,/, '')
  const buffer = Buffer.from(base64, 'base64')

  const key = entry.entryId + '.jpg'
  const result = await uploadImageToS3(key, buffer)

  const imageUrl = result.Location
  console.log('result location', imageUrl)

  const updatedEntry = await setCoverImageUrl(userId, entryId, imageUrl)

  return updatedEntry
})

export const handler = commonMiddleware(main)
