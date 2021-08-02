import { lamdbaHandler, dynamodb, commonMiddleware } from "../../lib"
import createDiveSchema from "../../schema/createDiveSchema"
import validator from "@middy/validator"
import { v4 as uuid } from "uuid"

export const DIVE_DIVER_TABLE = process.env.DIVE_DIVER_TABLE

const main = async (event, context) => {
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
    _ID: uuid(),
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
  }

  console.log(params)

  const result = await dynamodb.put(params)

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

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
