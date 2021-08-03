import { lambdaHandler, dynamodb, commonMiddleware } from "../../../../lib"
import createDiveSchema from "./schema"
import validator from "@middy/validator"
import { v4 as uuid } from "uuid"

// testing cicd

export const DIVE_DIVER_TABLE = process.env.DIVE_DIVER_TABLE

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
    TableName: DIVE_DIVER_TABLE,
    Item: newDive,
    ReturnValues: "ALL_OLD",
  }

  await dynamodb.put(params)

  return params.Item
})

// exported lambda handler func with middleware
export const handler = commonMiddleware(main).use(
  validator({
    inputSchema: createDiveSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  })
)
