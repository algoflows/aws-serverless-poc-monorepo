const schema = {
  type: "object",
  properties: {
    queryStringParameters: {
      properties: {
        status: {
          type: "string",
          enum: ["OPEN", "CLOSED"],
          default: "OPEN",
        },
      },
    },
  },
  required: ["queryStringParameters"],
}

export default schema
