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

type Response events.APIGatewayProxyResponse
type Request events.APIGatewayProxyRequest

type Item struct {
	Id      string `json:"id,omitempty"`
	Title   string `json:"title"`
	Details string `json:"details"`
}

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(request Request) (Response, error) {

	fmt.Println("method", request.HTTPMethod)

	// New uuid for item id
	itemUuid := uuid.New().String()
	fmt.Println("Generated new item uuid:", itemUuid)

	// Unmarshal to Item to access object properties
	itemString := request.Body
	itemStruct := Item{}
	json.Unmarshal([]byte(request.Body), &itemStruct)

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
		Body:            itemString,
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
