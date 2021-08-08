import * as dynamoose from 'dynamoose'

// Create new DynamoDB instance
const profiles_service_table = new dynamoose.aws.sdk.DynamoDB({
  accessKeyId: 'AKIAVSUP2SWLY65WCTWV',
  secretAccessKey: 'WSLF6NnJA51pqWc2k4atpoP0p6CCfS2tzoCc/hSASECRET',
  region: 'eu-west-1'
})

// Set DynamoDB instance to the Dynamoose DDB instance
export default dynamoose.aws.ddb.set(profiles_service_table)
