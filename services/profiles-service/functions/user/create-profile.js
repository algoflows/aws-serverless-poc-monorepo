import { lambdaHandler, dynamodb, commonMiddleware } from '../../lib'
import validator from '@middy/validator'
import { v4 as uuid } from 'uuid'

const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

/* Schema validation fields - TODO
    userId,
    supervisorName,
    supervisorEmail,
    companyName,
    clientName,
    diveLocation,
    maximumDepthMeters,
    leftSurfaceAt,
    bottomTimeMinutes,
    decoCompletedAt,
    tableUsed,
    breathingMixture,
    equipmentUsed,
    diveDescription,
*/

const main = lambdaHandler(async (event, context) => {
  const { userId } = event.body
  const now = new Date()

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Item: {
      ...event.body,
      PK: `userId#${userId}`,
      SK: `diveId#${uuid()}`,
      userVerifiedAt: 'false',
      companyVerifiedAt: 'false',
      clientVerfiedAt: 'false',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    },
    ReturnValues: 'ALL_OLD'
  }

  await dynamodb.put(params)

  return params.Item
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
        verifierId: {
          type: 'string'
        },
        company: {
          type: 'string'
        },
        logType: {
          type: 'string'
        },
        country: {
          type: 'string'
        }
      },
      required: ['userId', 'verifierId', 'company', 'logType', 'country']
    }
  },
  required: ['body']
}

// exported lambda handler func with middleware
export const handler = commonMiddleware(main).use(
  validator({
    inputSchema: schema,
    ajvOptions: {
      useDefaults: true,
      strict: false
    }
  })
)
