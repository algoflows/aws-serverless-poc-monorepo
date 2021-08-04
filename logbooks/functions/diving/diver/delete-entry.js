import { lambdaHandler, dynamodb, commonMiddleware } from "../../../lib"
// import validator from "@middy/validator"

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

const main = lambdaHandler(async (event, context) => {
  const { id } = event.pathParameters

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Key: {
      id: String(id),
    },
    ReturnValues: "ALL_OLD",
  }

  const result = await dynamodb.delete(params)

  console.log("result checker", result)

  return result
})

const deleteSchema = {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
      required: ["id"],
    },
  },
  required: ["pathParameters"],
}

// exported lambda handler func with middleware
export const handler = commonMiddleware(main)
