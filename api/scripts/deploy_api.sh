#!/bin/bash
cp -a ../services/. ./services

npm install

npm run setup

rm services/chalk.js
rm services/iot.js
rm -rf node_modules

npm install --production

aws cloudformation package --t sam-template.yml --s3-bucket $BUCKET --output-template-file sam-output.yml

aws cloudformation deploy --template-file sam-output.yml --stack-name demo-api --capabilities CAPABILITY_IAM

rm src/host
rm sam-output.yml
