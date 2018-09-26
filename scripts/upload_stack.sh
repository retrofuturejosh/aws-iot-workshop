echo uploading to S3
aws s3 cp ./stacks/IoT-Workshop-Stack.yml s3://sohnbucket --acl public-read
