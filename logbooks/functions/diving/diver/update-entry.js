import { lambdaHandler, commonMiddleware, createError, dynamodb } from "../../../lib"

export const DIVING_DIVER_TABLE = process.env.DIVING_DIVER_TABLE

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

  const { id } = event.pathParameters
  const entry = await dynamodb.get(id)

  if (!entry) {
    throw new createError(404, `Entry ${id} not found`)
  }

  const params = {
    TableName: DIVING_DIVER_TABLE,
    Key: { id },
    UpdateExpression: "set highestBid.amount = :amount",
    ExpressionAttributeValues: {
      ":amount": amount,
    },
    ReturnValues: "ALL_NEW",
  }

  const result = await dynamodb.update(params).promise()

  return result
})

export const handler = commonMiddleware(main)

// .use(
//   validator({
//     inputSchema: placeBidSchema,
//   })
// )
