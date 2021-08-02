const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        supervisorName: {
          type: 'string',
        },
        supervisorEmail: {
          type: 'string',
        },
      },
      required: ['userId', 'supervisorName', 'supervisorEmail'],
    },
  },
  required: ['body'],
}

export default schema
