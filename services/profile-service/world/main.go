package main

import (
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/google/uuid"
)

// var service_name_env = os.Getenv("service_name_env")
// var epsagon_api_key = os.Getenv("epsagon_api_key")

// // Kafka
// bootstrap.servers=pkc-4r297.europe-west1.gcp.confluent.cloud:9092
// security.protocol=SASL_SSL
// sasl.mechanisms=PLAIN
// sasl.username=BIVUTLJAIRPMBKS5
// sasl.password=whyko2qtER3KxbOBebbYJmb9Gb6O6R3NwUxgz8bCp6zaBJszivdd2yDf2olvjEA2

type Response events.APIGatewayProxyResponse
type Request events.APIGatewayProxyRequest

type Item struct {
	Id      string `json:"id,omitempty"`
	Title   string `json:"title"`
	Details string `json:"details"`
}

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(request Request) (Response, error) {

	// New uuid for item id
	itemUuid := uuid.New().String()

	// Unmarshal to Item to access object properties
	itemString := request.Body
	itemStruct := Item{}
	json.Unmarshal([]byte(itemString), &itemStruct)

	if itemStruct.Title == "" {
		return Response{StatusCode: 400}, nil
	}

	// Create new item of type item
	item := Item{
		Id:      itemUuid,
		Title:   itemStruct.Title,
		Details: itemStruct.Details,
	}

	// testing
	fmt.Printf("%s \n %s \n %s", item.Id, item.Title, item.Details)

	resp := Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            request.Body,
		Headers: map[string]string{
			"Content-Type":           "application/json",
			"X-MyCompany-Func-Reply": "world-handler",
		},
	}

	return resp, nil
}

func main() {
	// config := epsagon.NewTracerConfig(service_name_env, epsagon_api_key)
	// lambda.Start(epsagon.WrapLambdaHandler(config, Handler))
	lambda.Start(Handler)
}
