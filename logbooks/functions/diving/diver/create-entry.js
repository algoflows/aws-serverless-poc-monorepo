import { lambdaHandler, dynamodb, commonMiddleware } from "../../../lib"
import validator from "@middy/validator"
import { v4 as uuid } from "uuid"

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
  const now = new Date()

  const { userId } = event.body

  const newEntry = {
    ...event.body,
    entryId: uuid(),
    verifierSigned: "false",
    companyStamped: "false",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Key: {
      PK: `USERID#${userId}`,
      SK: "LGBK#DIVING_DIVER",
    },
    Item: newEntry,
    ReturnValues: "ALL_OLD",
  }

  await dynamodb.put(params)

  return params.Item
})

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
        verifierId: {
          type: "string",
        },
        companyName: {
          type: "string",
        },
        entryType: {
          type: "string",
        },
        country: {
          type: "string",
        },
      },
      required: ["userId", "verifierId", "companyName", "entryType", "country"],
    },
  },
  required: ["body"],
}

// exported lambda handler func with middleware
export const handler = commonMiddleware(main).use(
  validator({
    inputSchema: schema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  })
)
