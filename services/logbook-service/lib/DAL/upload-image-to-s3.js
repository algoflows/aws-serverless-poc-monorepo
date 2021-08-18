import AWS from 'aws-sdk'
const s3 = new AWS.S3()

const LOGBOOK_BUCKET_NAME = process.env.LOGBOOK_BUCKET_NAME

const base64MimeType = async (encoded) => {
	var result = null

	if (typeof encoded !== 'string') {
		return result
	}

	var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)

	if (mime && mime.length) {
		result = mime[1]
	}

	return result
}

export async function uploadImageToS3(entryId, file) {
	// get mimetype
	// extract extension
	const mimeType = await base64MimeType(file)
	const fileExt = mimeType.split('/')[1]

	// remove base64 fluff from string
	file = file.replace(/^data:image\/\w+;base64,/, '')
	// create buffer
  const buffer = Buffer.from(file, 'base64')
	// create Key using entryId with correct file extension
  const key = `${entryId}.${fileExt}`

	const result = await s3.upload({
		Bucket: LOGBOOK_BUCKET_NAME,
		Key: key,
		Body: buffer,
		ContentEncoding: 'base64',
		ContentType: mimeType
	}).promise()

	return result.Location
}