# Payment API Service

## Description
Implementing a payment service with JSON API in NestJs Framework.
API methods require authentication by passing a bearer token. https://tools.ietf.org/html/rfc7519

### Services
- Auth Service which generates a JWT token and authenticates the API call requests.
- Payments Service which handles API calls for payments: Creating, Listing, Approving and Canceling.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)


## Quick Start
### Clone repository
```bash
$ git clone git@github.com:geokakou/payment-api-service.git
$ cd payment-api-service
```

### Build and Run Image
```bash
$ docker build . -t payment-api-app
$ docker run --rm -p 3000:3000 -d payment-api-app
```

## API Methods
### Authentication
- Description: Issues a temporary authentication token that can be used for the rest of the calls. 
- Method: POST
- Path: /v1/authenticate

Request Body:
```json
{
  "username": "george",
  "password": "pass1234"
}
```

Response Body:
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI7Imdlb3JnZSIsImlhdCI6MTYyMzYxMDEwOCwiZXhwIjoxNjIzNjEwNzA4fQ.vS6V3GJnxIyPT0w_YLxpazuX1FYwspZjaOe6jABM3iI",
  "expiresIn": "2021-06-13T18:58:28.399Z"
}
```

Curl example:
```bash
$ curl -X POST http://localhost:3000/v1/authenticate -d '{"username": "george", "password": "pass1234"}' -H "Content-Type: application/json"
```


### List payments
- Description: Returns the list of existing payments. 
- Method: GET 
- Path: /v1/payments

Response Body:
```json
[
  {
    "id": "f9ef5285-d8f2-4977-adfc-4294b74e67dc",
    "payeeId": "7a03c664-817f-4271-9aa0-bc91ec901973",
    "payerId": "1a03c664-817f-4271-9aa0-bc91ec901972",
    "paymentSystem": "master",
    "paymentMethod": "PBM",
    "amount": 5,
    "currency": "USD",
    "status": "created",
    "comment": null,
    "created": "2021-06-13T11:53:04.887Z",
    "updated": "2021-06-13T11:53:04.887Z"
  }
]
```

Curl example:
```bash
$ curl http://localhost:3000/v1/payments -H "Authorization: Bearer <TOKEN>"
```

### Create payment
- Description: Creates a new payment. 
- Method: POST
- Path: /v1/payments

Request Body:
```json
{
  "payeeId": "7a03c664-817f-4271-9aa0-bc91ec901973",
  "payerId": "1a03c664-817f-4271-9aa0-bc91ec901972",
  "paymentSystem": "master",
  "paymentMethod": "PBM",
  "currency": "USD",
  "amount": 50,
  "comment": "bills "
}
```

Response Body:
```json
{
  "id": "fe34d739-97eb-46e1-aeeb-cb683a4da298",
  "payeeId": "7a03c664-817f-4271-9aa0-bc91ec901973",
  "payerId": "1a03c664-817f-4271-9aa0-bc91ec901972",
  "paymentSystem": "master",
  "paymentMethod": "PBM",
  "amount": 50,
  "currency": "USD",
  "status": "created",
  "comment": "bills ",
  "created": "2021-06-13T19:02:43.525Z",
  "updated": "2021-06-13T19:02:43.525Z"
}
```

Curl example:
```bash
$ curl -X POST http://localhost:3000/v1/payments  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"payeeId": "7a03c664-817f-4271-9aa0-bc91ec901973","payerId": "1a03c664-817f-4271-9aa0-bc91ec901972","paymentSystem": "master","paymentMethod": "PBM","currency": "USD","amount": 50,"comment": "bills"}'
```

### Get payments
- Descriptions: Returns an existing payment. 
- Method: GET
- Path: /v1/payments/:id

Response Body:
```json
{
  "id": "fe34d739-97eb-46e1-aeeb-cb683a4da298",
  "payeeId": "7a03c664-817f-4271-9aa0-bc91ec901973",
  "payerId": "1a03c664-817f-4271-9aa0-bc91ec901972",
  "paymentSystem": "master",
  "paymentMethod": "PBM",
  "amount": 50,
  "currency": "USD",
  "status": "created",
  "comment": "bills ",
  "created": "2021-06-13T19:02:43.525Z",
  "updated": "2021-06-13T19:02:43.525Z"
}
```

Curl example:
```bash
$ curl http://localhost:3000/v1/payments/4f788f73-14ed-4bcc-9000-ad205b6ff3d7  -H "Authorization: Bearer <TOKEN>" 
```

### Approve payment
- Description: Approves a payment
- Method: PUT
- Path: /v1/payments/:id/approve

Curl example:
```bash
$ curl -X PUT http://localhost:3000/v1/payments/4f788f73-14ed-4bcc-9000-ad205b6ff3d7/approve -H "Authorization: Bearer <TOKEN>" 
```

### Cancel payment
- Description: Cancels created payment that hasn’t been approved yet. 
- Method: PUT
- Path: /v1/payments/:id/cancel

Curl example:
```bash
$ curl -X PUT http://localhost:3000/v1/payments/5f988f73-14ed-4bcc-9000-ad205b6ff3d8/cancel -H "Authorization: Bearer <TOKEN>" 
```


## License

Nest is [MIT licensed](LICENSE).
