# ServerlessSecurityCam
Raspberry pi cam utilizing AWS's Kinesis Producer SDK. 
We can know offload memory resourceful tasks on to the cloud.

## About 
By leveraging the cloud we gain both Security and Functionality. This app will be divided into two directories, one for the serverless web analytics + livestream dashboard. The Second will be for analytics, parsing, and should act as a basic c&c server. 

## Install
    cd /Dashboard
    yarn 
    yarn start

Dashboard will use Cognito, lambdas, and API-Gateway all backed by the Serverless Framework. 

## Architecture

We are going off the Brain_Power_fidgetology for Machine learning, just subsitute the webcam for the Raspberry Pi w/ SDK

![Screenshot](https://github.com/DustinTheGreat/ServerlessSecurityCam/blob/main/Brain_Power_fidgetology_02__SystemArchitectureDiagram.png)
