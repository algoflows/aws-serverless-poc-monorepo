import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

const MAIL_QUEUE_URL = process.env.MAIL_QUEUE_URL

export const notifyVerifier = async (item) => {
	const notifyVerifier = sqs
	.sendMessage({
		QueueUrl: MAIL_QUEUE_URL,
		MessageBody: JSON.stringify({
		subject: 'OSPAP: New entry for you to verify',
		recipient: item.userVerifierId,
		body: `
	Hi (userVerifierName),

	This is an automated notification.

	You have have been listed as the verifiying supervisor:

	Details:
	user: ${item.userId}
	Air/Sat: ${item.entryType}
	Insh/Offsh: ${item.subTypeA}
	Type: ${item.subTypeB}
	Company: ${item.company}
	Client: ${item.client}
	Depth: ${item.depthMeters}m 
	DateTime: ${item.leftSurface}

	Verification status:
	User: ${item.userVerified}
	Company: ${item.companyVerified}
	Client: ${item.clientVerified}

	Follow this link to validate the record:

	https://dev.opsap.com/user/logbook/entry/details/${item.userId}/${item.entryId}

	Thank you.

	OPSAP Team.
			`
		})
	})
	.promise()

	return notifyVerifier
}