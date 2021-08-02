import { createError } from "./index"

// testing all cicd depl comment

export function lambdaHandler(lambda) {
  return async function (event, context) {
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
