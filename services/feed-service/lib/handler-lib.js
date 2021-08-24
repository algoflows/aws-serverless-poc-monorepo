import { createError } from "./index"

// if (event.source === "serverless-plugin-warmup") {
//   console.log("WarmUp - Lambda is warm!")
//   /** Slightly delayed (25ms) response to ensure concurrent invocation */
//   await new Promise((r) => setTimeout(r, 25))
//   return "Lambda is warm!"
// }

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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body),
    }
  }
}
