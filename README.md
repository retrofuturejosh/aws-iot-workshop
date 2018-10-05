# AWS IoT Workshop
Created by Josh Sohn for Cedrus Digital, 2018

## Workshop Directions
You can find the directions for the workshop here:

[Workshop Directions](https://s3.amazonaws.com/sohnbucket/Iot+Workshop.pdf)

## Repo Contents

In this repo, you'll find:

- `Stacks/Iot-Workshop Stack` - the inital CloudFormation template for creating necessary resources
- `/api` - AWS SAM project that creates an API Gateway with GET and POST endpoints and associated Lambda functions
- `/deltas` - AWS SAM project that creates a lambda function to be deployed to a Greengrass group in order to issue device commands
- `/helloWorld` - AWS SAM project that creates a lambda function to test communication between Greengrass and the cloud
- `services` - shared services for the multiple SAM projects
- `test` - unit testing. Run testing suite with the command `npm test`
- `buildspec.yml` - buildspec for CodeBuild Project, as part of CodePipeline, to deploy Lambda functions and API Gateway


## Helpful Links

- [Workshop Directions](https://s3.amazonaws.com/sohnbucket/Iot+Workshop.pdf)
- [AWS IoT Core Docs](https://s3.amazonaws.com/sohnbucket/Iot+Workshop.pdf)
- [AWS Greengrass Docs](https://docs.aws.amazon.com/greengrass/latest/developerguide/what-is-gg.html)
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS SAM Docs](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html)
- [[Article] AWS Greengrass - the Missing Manual](https://read.acloud.guru/aws-greengrass-the-missing-manual-2ac8df2fbdf4)

