import { createError } from "./index"

export function lambdaHandler(lambda) {
  return async function (event, context, callback) {
    // early exit if warmup function execution
    if (event.source === "serverless-plugin-warmup") {
      console.log("WarmUP - Lambda is warm!")
      return callback(null, "Lambda is warm!")
    }

    let body, statusCode
    try {
      // Run the Lambda
      body = await lambda(event, context)
      statusCode = 200
    } catch (e) {
      body = { error: e.message }
      statusCode = 500
      console.error(e)
      throw new createError.InternalServerError(e)
    }
    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
    }
  }
}
