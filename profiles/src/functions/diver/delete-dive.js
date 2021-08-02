import { getEndedAuctions } from "../../services"
import { closeAuction } from "../../services"
import { createError } from "../../../../shared"

async function deleteDives(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions()
    const closePromises = auctionsToClose.map((auction) => closeAuction(auction))
    await Promise.all(closePromises)
    return { closed: closePromises.length }
  } catch (error) {
    console.error(error)
    throw new createError.InternalServerError(error)
  }
}

export const handler = processAuctions
