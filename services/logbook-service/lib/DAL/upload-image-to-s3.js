import AWS from 'aws-sdk'

const s3 = new AWS.S3()

const LOGBOOK_BUCKET_NAME = process.env.LOGBOOK_BUCKET_NAME

export async function uploadImageToS3(key, body) {
	const result = await s3.upload({
		Bucket: LOGBOOK_BUCKET_NAME,
		Key: key,
		Body: body,
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg'
	}).promise()

	return result
}