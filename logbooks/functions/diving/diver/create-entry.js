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

  const newEntry = {
    ...event.body,
    entryId: uuid(),
    supervisorSigned: "false",
    companyStamped: "false",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Key: {
      PK: event.body.userId,
      SK: "LGBK#DIVINGDIVER",
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
        supervisorName: {
          type: "string",
        },
        supervisorEmail: {
          type: "string",
        },
      },
      required: ["userId", "supervisorName", "supervisorEmail"],
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
