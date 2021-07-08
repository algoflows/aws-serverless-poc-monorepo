import { v4 as uuid } from "uuid"
import AWS from "aws-sdk"
import middy from "@middy/core"
import httpJsonBodyParser from "@middy/http-json-body-parser"
import httpEventNormalizer from "@middy/http-event-normalizer"
import httpErrorHandler from "@middy/http-error-handler"
import createError from "http-errors"

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const createAuction = async (event, context) => {
  const { title } = event.body
  const now = new Date()

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction,
  }

  try {
    await dynamoDb.put(params).promise()
  } catch (e) {
    console.error(e)
    throw new createError.InternalServerError(e)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(params.Item),
  }
}

// lambda middleware
export const handler = middy(createAuction)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler())
