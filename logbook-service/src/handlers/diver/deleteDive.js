import { getEndedAuctions } from '../../hooks'
import { closeAuction } from '../../hooks'
import { createError } from '../../lib'

async function deleteDives(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions()
    const closePromises = auctionsToClose.map((auction) =>
      closeAuction(auction),
    )
    await Promise.all(closePromises)
    return { closed: closePromises.length }
  } catch (error) {
    console.error(error)
    throw new createError.InternalServerError(error)
  }
}

export const handler = processAuctions
