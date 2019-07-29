# Setup a async lambda endpoint

## Steps

1. Create a new Policy.
2. Create a new Role to handle the operations.
3. Edit the new Role.
4. Create a new Resource and Method through the API Gateway.
5. Setup your new API.
6. Setup a HTTP response for your integration.
7. Test it.

## Going through the steps

### 1. Create a new Policy

1. Go to: <https://console.aws.amazon.com/iam/home>
2. Start creating a new Policy, like the one below:
3. Name it as 'lambda_execute'.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "lambda:InvokeFunction",
      "Resource": "*"
    }
  ]
}
```

### 2. Create a new Role to handle the operations

1. Go to: <https://console.aws.amazon.com/iam/home>
2. Start creating a new role.
3. At 'Select type of trusted entity' choose: 'AWS Service'.
4. At 'Choose the service that will use this role' choose: 'Lambda'.
5. Then, at Permissions, choose the Policy created before: 'lambda_execute'.
6. Name it as: 'lambda_invoke_function_assume_apigw_role'.

### 3. Edit the new Role trusted realtionships

1. Go to: <https://console.aws.amazon.com/iam/home>
2. Click at 'Roles' and search your new created role: 'lambda_invoke_function_assume_apigw_role'.
3. Go to the 'Trust relationships' tab and Edit it to the example below:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": ["apigateway.amazonaws.com", "lambda.amazonaws.com"]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### 4. Create a new Resource and Method through the API Gateway

1. Go to: <https://console.aws.amazon.com/apigateway>.
2. Open the Lambda APIs, go to Resources and click at '/'.
3. Create a new Resource under Actions button, eg: 'api'.
4. Click at your new resource, then again under Actions, create a new Method, eg: 'post'.
5. Folow the setup below.

### 5. Setup your new API

1. Integration Type: AWS Service.
2. AWS Region: Your Lambda Region.
3. HTTP Method: Always Post, doesn't matter how you described it before in serverless.yml.
4. Choose 'Path Override', then: `/2015-03-31/functions/YOUR-LAMBDA-ARN-GOES-HERE/invocations`.
5. Execution Role: Paste the lambda_invoke_function_assume_apigw_role ARN.
6. Content Handling: Passthrough.
7. It should be working now, but giving no responses.

### 6. Setup a HTTP response for your integration

1. Click back at 'Resources', then at your Lambda Async method.
2. Click at 'Integration Response'.
3. You should see a row, expand it, then expand: 'Mapping Templates'.
4. Add a 'application/json' mapping template.
5. Then paste the template below, save and you are done!

```javascript
{
  "success": true
}
```

### 7. Testing

1. Click at '<- Method Execution' or just click somewhere else, then back to your Async Method.
2. Click at '⚡ TEST'.
3. You may be able to set a Request Body, do it as you wish.
4. Then finally test it!
5. May be good to watch your Lambda logs rolling.
