import { lambdaHandler, dynamodb, commonMiddleware } from '../../../lib'
import validator from '@middy/validator'
import { v4 as uuid } from 'uuid'
import { Logbook } from '../logbookEnum'

const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

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
