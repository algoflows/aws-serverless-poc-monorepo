import { lambdaHandler, dynamodb, commonMiddleware } from '../../../lib'
import { notifyUser, notifyVerifier } from '../../../lib/email-templates'
import { uploadImageToS3, setImageUrl } from '../../../lib/DAL'
import validator from '@middy/validator'
import { v4 as uuid } from 'uuid'
import { Logbook } from '../logbookEnum'
import AWS from 'aws-sdk'

const kinesis = new AWS.Kinesis()

const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE
const EVENTS_STREAM_CREATE_ENTRY = process.env.EVENT_STREAM_CREATE_ENTRY

const main = lambdaHandler(async (event) => {
  const { userId } = event.body
  const now = new Date()
  const entryId = uuid()
  let coverPhoto

  // Check if image has been uploaded from client
  // Set event.body image to field to null because of dynamodb 400kb item limit
  if (event.body.coverPhoto) {
    coverPhoto = event.body.coverPhoto
    event.body.coverPhoto = null
  }

  // Construct new lobook entry object
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

  // Save entry object to db
  await dynamodb.put(params)

  // Add photo to s3 and add s3 imageUrl to item stored in dynamodb
  if (coverPhoto) {
    const location = await uploadImageToS3(entryId, coverPhoto)
    params.Item = await setImageUrl(userId, entryId, location)
  }

  // Send notification emails to both verifier and user
  const mailResults = await Promise.all([notifyUser(params.Item), notifyVerifier(params.Item)])

  // Construct kineses stream data object
  const data = {
    ...params.Item,
    eventType: 'create-entry'
  }

  // Construct kineses event putReq object
  const putReq = {
    Data: JSON.stringify(data),
    PartitionKey: params.Item.entryId,
    StreamName: EVENTS_STREAM_CREATE_ENTRY
  }

  // Put event kinesis object into stream
  await kinesis.putRecord(putReq).promise()
  console.log('published new entry to kineses')

  // Construct result object
  const result = {
    Item: params.Item,
    mailResults
  }

  return result
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
