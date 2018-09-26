#!/bin/bash
cp -a ../services/. ./services

npm install

npm run setup

rm -rf node_modules

npm install --production

aws cloudformation package --t sam-template.yml --s3-bucket $BUCKET --output-template-file sam-output.yml

aws cloudformation deploy --template-file sam-output.yml --stack-name delta-lambda --capabilities CAPABILITY_IAM
