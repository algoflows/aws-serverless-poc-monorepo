import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function widget(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res)
    const { id } = req.query

    const response = await fetch(`https://MY_API_DOMAIN/widget/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const widget = await response.json()

    res.status(200).json(widget)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})
