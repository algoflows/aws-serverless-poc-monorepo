import Amplify, { withSRRContext } from "aws-amplify"
import config from "../../aws-exports"

Amplify.configure({ ...config, srr: true })

export default async function checkUser(req, res) {
  const { Auth } = withSRRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    res.json({ user: user.username })
  } catch (error) {
    res.statusCode = 200
    res.json({ user: null })
  }
}
