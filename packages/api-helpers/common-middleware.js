import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler'

export const commonMiddleware = (handler) =>
  middy(handler).use([httpJsonBodyParser(), httpEventNormalizer(), JSONErrorHandlerMiddleware()])
