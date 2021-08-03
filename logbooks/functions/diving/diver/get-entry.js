import { commonMiddleware } from "../../../../shared"
import { getAuction } from "../../services"

const getDive = async (event, context) => {
  const { id } = event.pathParameters

  const auction = await getAuction(id)

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  }
}

// lambda middleware
export const handler = commonMiddleware(getSingleAuction)
