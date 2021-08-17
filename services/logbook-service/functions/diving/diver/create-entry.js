import { lambdaHandler, dynamodb, commonMiddleware } from '../../../lib'
import validator from '@middy/validator'
import { v4 as uuid } from 'uuid'
import { Logbook } from '../logbookEnum'
import AWS from 'aws-sdk'

const sqs = new AWS.SQS()

const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE
const MAIL_QUEUE_URL = process.env.MAIL_QUEUE_URL

const main = lambdaHandler(async (event) => {
  const { userId } = event.body

  const now = new Date()
  const entryId = uuid()

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Item: {
      ...event.body,
      PK: `userId#${userId}`,
      SK: `diveId#${entryId}`,
      entryId: entryId,
      logbook: Logbook.diver,
      companyVerifierId: 'null',
      clientVeriferId: 'null',
      userVerified: 'false',
      companyVerified: 'false',
      clientVerified: 'false',
      GSK1: event.body.GSK1 || 'null',
      GSK2: event.body.GSK2 || 'null',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    },
    ReturnValues: 'ALL_OLD'
  }

  await dynamodb.put(params)

  const {
    entryType,
    subTypeA,
    subTypeB,
    company,
    client,
    depthMeters,
    leftSurface,
    userVerified,
    userVerifierId,
    companyVerified,
    clientVerified
  } = params.Item

  const notifyUser = sqs
    .sendMessage({
      QueueUrl: MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: 'OPSAP: New logbook entry successfully added',
        recipient: 'sean@opsap.com',
        body: `

        Hi ${userId},

        Hey rockstar, this is an automated message.

        You have successfully added a new entry.
      
        entryType: ${entryType}
        subType:   ${subTypeA}
        subType:   ${subTypeB}
        Company:   ${company}
        Client:    ${client}
        Depth:     ${depthMeters}m 
        DateTime:  ${leftSurface}
        
        Verification status: 
        User: ${userVerified}
        Company: ${companyVerified}
        Client: ${clientVerified}


        Our automated verification system has notified ${userVerifierId} to verify the entry.

        Dive safe, thank you.

        OPSAP Team.
        `
      })
    })
    .promise()

  const notifyVerifier = sqs
    .sendMessage({
      QueueUrl: MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: 'OSPAP: New entry for you to verify',
        recipient: 'sean@opsap.com',
        body: `

        Hi (userVerifierName),

        Hey rockstar, this is an automated message.

        You have have been listed as the verifiying supervisor for the entry listed below:
      
        user:      ${userId}
        entryType: ${entryType}
        subType:   ${subTypeA}
        subType:   ${subTypeB}
        Company:   ${company}
        Client:    ${client}
        Depth:     ${depthMeters}m 
        DateTime:  ${leftSurface}
        
        Verfication status:
        User: ${userVerified}
        Company: ${companyVerified}
        Client: ${clientVerified}

        Please signin into your account to verifiy and validate the record.

        Alternatively follow this link, if all the details are correct then click the verify button and the entry will become officially signed and verified.

        https://dev.opsap.com/user/logbook/entry/details/${userId}/${entryId}


        Thank you.

        OPSAP Team.
        `
      })
    })
    .promise()

  return Promise.all([notifyUser, notifyVerifier])
})

const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        userId: {
          type: 'string'
        },
        entryType: {
          type: 'string'
        },
        subTypeA: {
          type: 'string'
        },
        company: {
          type: 'string'
        },
        client: {
          type: 'string'
        },
        location: {
          type: 'string'
        },
        country: {
          type: 'string'
        },
        depthMeters: {
          type: 'string'
        },
        leftSurface: {
          type: 'string'
        },
        bottomTime: {
          type: 'string'
        },
        arrivedSurface: {
          type: 'string'
        },
        table: {
          type: 'string'
        },
        mixture: {
          type: 'string'
        },
        subTypeB: {
          type: 'string'
        },
        details: {
          type: 'string'
        }
      },
      required: ['userId']
    }
  },
  required: ['body']
}

export const handler = commonMiddleware(main).use(
  validator({
    inputSchema: schema,
    ajvOptions: {
      useDefaults: true,
      strict: false
    }
  })
)
