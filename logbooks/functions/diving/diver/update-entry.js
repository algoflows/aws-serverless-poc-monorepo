import { lambdaHandler, commonMiddleware, createError, dynamodb } from "../../../lib"

export const LOGBOOK_SERVICE_TABLE = process.env.LOGBOOK_SERVICE_TABLE

const main = lambdaHandler(async (event, context) => {
  // const {
  //   userId,
  //   supervisorName,
  //   supervisorEmail,
  //   companyName,
  //   clientName,
  //   diveLocation,
  //   maximumDepthMeters,
  //   leftSurfaceAt,
  //   bottomTimeMinutes,
  //   decoCompletedAt,
  //   tableUsed,
  //   breathingMixture,
  //   equipmentUsed,
  //   diveDescription,
  // } = event.body

  const { id } = event.pathParameters
  const entry = await dynamodb.get(id)

  if (!entry) {
    throw new createError.NotFound("Entry not found")
  }

  const params = {
    TableName: LOGBOOK_SERVICE_TABLE,
    Key: { id },
    UpdateExpression: "set highestBid.amount = :amount",
    ExpressionAttributeValues: {
      // ":amount": amount,
    },
    ReturnValues: "ALL_NEW",
  }

  const result = await dynamodb.update(params)

  return result
})

export const handler = commonMiddleware(main)

// .use(
//   validator({
//     inputSchema: placeBidSchema,
//   })
// )
