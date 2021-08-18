import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

const MAIL_QUEUE_URL = process.env.MAIL_QUEUE_URL

export const notifyUser = async (item) => {
	const notifyUser = sqs
    .sendMessage({
      QueueUrl: MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: 'OPSAP: New logbook entry successfully added',
        recipient: 'sean@opsap.com',
        body: `

        Hi ${item.userId},

        Hey rockstar, this is an automated message.

        You have successfully added a new entry.
      
        entryType: ${item.entryType}
        subType:   ${item.subTypeA}
        subType:   ${item.subTypeB}
        Company:   ${item.company}
        Client:    ${item.client}
        Depth:     ${item.depthMeters}m 
        DateTime:  ${item.leftSurface}
        
        Verification status: 
        User: ${item.userVerified}
        Company: ${item.companyVerified}
        Client: ${item.clientVerified}


        Our automated verification system has notified ${item.userVerifierId} to verify the entry.

        Dive safe, thank you.

        OPSAP Team.
        `
      })
    })
    .promise()

		return notifyUser
}