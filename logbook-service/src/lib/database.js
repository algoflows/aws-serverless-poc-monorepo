import AWS from "aws-sdk"
export const dynamoDb = new AWS.DynamoDB.DocumentClient()
export const TableName = process.env.AUCTIONS_TABLE_NAME
