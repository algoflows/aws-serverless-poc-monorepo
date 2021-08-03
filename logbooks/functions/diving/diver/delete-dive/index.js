import { lambdaHandler, dynamodb, commonMiddleware } from "../../../../lib"
// import deleteDiveSchema from "./schema"
// import validator from "@middy/validator"

export const DIVE_DIVER_TABLE = process.env.DIVE_DIVER_TABLE

const main = lambdaHandler(async (event, context) => {
  const { id } = event.pathParameters

  const params = {
    TableName: DIVE_DIVER_TABLE,
    Key: {
      id: String(id),
    },
    ReturnValues: "ALL_OLD",
  }

  const result = await dynamodb.delete(params)

  console.log("result checker", result)

  return result
})

// exported lambda handler func with middleware
export const handler = commonMiddleware(main)
