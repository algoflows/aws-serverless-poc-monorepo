import { coreMiddleware } from "../lib"
import { useGetAuction } from "../hooks"

const getAuction = async (event, context) => {
  const { id } = event.pathParameters

  const auction = await useGetAuction(id)

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  }
}

// lambda middleware
export const handler = coreMiddleware(getAuction)
