package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/epsagon/epsagon-go/epsagon"
)

var service_name_env = os.Getenv("service_name_env")
var epsagon_api_key = os.Getenv("epsagon_api_key")

type Response events.APIGatewayProxyResponse
type Request events.APIGatewayProxyRequest

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(ctx context.Context, req Request) (Response, error) {
	var buf bytes.Buffer

	fmt.Println(req.HTTPMethod)
	fmt.Println(req.Path)

	body, err := json.Marshal(map[string]interface{}{
		"message": "Go Serverless v1.0! Your function executed successfully!",
		"testMsg": "testing testing",
	})
	if err != nil {
		return Response{StatusCode: 404}, err
	}

	json.HTMLEscape(&buf, body)

	resp := Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            buf.String(),
		Headers: map[string]string{
			"Content-Type":           "application/json",
			"X-MyCompany-Func-Reply": "hello-handler",
		},
	}

	return resp, nil
}

func main() {
	config := epsagon.NewTracerConfig(service_name_env, epsagon_api_key)
	lambda.Start(epsagon.WrapLambdaHandler(config, Handler))
}
