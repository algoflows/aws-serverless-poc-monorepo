import dynamoose from './config'

export const Diver = dynamoose.model(
  'Diver',
  {
    name: String,
    lastName: String
  },
  { create: false }
)
