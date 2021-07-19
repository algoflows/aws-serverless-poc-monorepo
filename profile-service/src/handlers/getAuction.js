import { coreMiddleware } from "../lib"
import { getAuction } from "../hooks"

const getSingleAuction = async (event, context) => {
  const { id } = event.pathParameters

  const auction = await getAuction(id)

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  }
}

// lambda middleware
export const handler = coreMiddleware(getSingleAuction)
