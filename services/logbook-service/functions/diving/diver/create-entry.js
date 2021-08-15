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
        subject: 'You have recorded a new logbook entry',
        recipient: 'sean@opsap.com',
        body: `

        Hi ${userId},

        This is an automated message.

        You have successfully added a new entry:
      
        entryType: ${entryType}
        subType:   ${subTypeA}
        subType:   ${subTypeB}
        Company:   ${company}
        Client:    ${client}
        Depth:     ${depthMeters}m 
        DateTime:  ${leftSurface}
        
        User verified?: ${userVerified}
        Company verified?: ${companyVerified}
        Client verified?: ${clientVerified}


        Our automated verification system has notified ${userVerifierId}. The verifier must digitally sign the entry for the entry to become an official verified record.

        Thanks you.

        OPSAP Team.
        `
      })
    })
    .promise()

  const notifyVerifier = sqs
    .sendMessage({
      QueueUrl: MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: 'You have recorded a new logbook entry',
        recipient: 'sean@opsap.com',
        body: `

        Hi PLACEHOLDER(userVerifierID),

        This is an automated message.

        You have hav been listed as a verifiying party for recorded entry listed below:
      
        user:      ${userId}
        entryType: ${entryType}
        subType:   ${subTypeA}
        subType:   ${subTypeB}
        Company:   ${company}
        Client:    ${client}
        Depth:     ${depthMeters}m 
        DateTime:  ${leftSurface}
        
        User verified?: ${userVerified}
        Company verified?: ${companyVerified}
        Client verified?: ${clientVerified}

        Please signin into the OPSAP platform to verifiy and validate the record.

        Thanks you.

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
