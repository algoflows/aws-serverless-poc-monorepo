// import validator from "@middy/validator"

export const handler = async (event, context) => {
  console.log('awesome stuff its working')
  console.log(event)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify('awesome stuff its working')
  }
}
