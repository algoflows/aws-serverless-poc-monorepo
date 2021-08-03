export const createSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
        supervisorName: {
          type: "string",
        },
        supervisorEmail: {
          type: "string",
        },
      },
      required: ["userId", "supervisorName", "supervisorEmail"],
    },
  },
  required: ["body"],
}

export const deleteSchema = {
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
