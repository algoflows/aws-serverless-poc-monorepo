import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'

/**
 * @api {get} /api/user/diving/diver/get-entries/:id Get entries
 * @apiName GetEntries
 * @apiGroup User
 * @apiVersion 0.1.
 * @apiHeader {String} Authorization JWT <token>
 * @apiParam {String} id User id
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 */

export default withApiAuthRequired(async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.status(400).send({ message: 'Only GET requests allowed' })
      return
    }

    console.log('REQ PARAMS', req.query)
    const { session } = await getSession(req, res)
    const { idToken } = session
    console.log(idToken)

    const response = await fetch(`https://dev-api.opsap.com/logbooks/diving/diver/${req.query.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    })

    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})
