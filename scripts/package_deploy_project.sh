#!bin/bash

echo deleting node_modules
rm -rf deltas/node_modules
rm -rf api/node_nodules

echo zipping package
zip -r iotworkshopsource deltas helloWorld buildspec.yml services api

echo uploading to S3
aws s3 mv iotworkshopsource.zip s3://sohnbucket/iotworkshopsource.zip --acl public-read
