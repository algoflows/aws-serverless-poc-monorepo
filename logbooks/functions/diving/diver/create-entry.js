import { lambdaHandler, dynamodb, commonMiddleware } from "../../../lib"
import { createSchema } from "./validation"
import validator from "@middy/validator"
import { v4 as uuid } from "uuid"

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

const main = lambdaHandler(async (event, context) => {
  const {
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
  } = event.body

  const now = new Date()

  const newDive = {
    id: uuid(),
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
    supervisorSigned: "false",
    companyStamped: "false",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Item: newDive,
    ReturnValues: "ALL_OLD",
  }

  await dynamodb.put(params)

  return params.Item
})

// exported lambda handler func with middleware
export const handler = commonMiddleware(main).use(
  validator({
    inputSchema: createSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  })
)
