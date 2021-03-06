#!/bin/bash

aws cloudformation package --t sam-template.yml --s3-bucket $BUCKET --output-template-file sam-output.yml

aws cloudformation deploy --template-file sam-output.yml --stack-name hello-greengrass --capabilities CAPABILITY_IAM
