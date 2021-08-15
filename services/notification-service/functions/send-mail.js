import AWS from 'aws-sdk'

const ses = new AWS.SES({ region: 'eu-west-1' })

export async function handler(event, context) {
  const record = event.Records[0]
  console.log('record processing', record)

  const email = JSON.parse(record.body)
  const { subject, body, recipient } = email

  // params
  const params = {
    Source: 'sean@opsap.com',
    Destination: {
      ToAddresses: [recipient]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    }
  }

  try {
    const result = await ses.sendEmail(params).promise()
    console.log(result)
    return result
  } catch (err) {
    console.error(err)
  }
}
