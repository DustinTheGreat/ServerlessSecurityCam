# ServerlessSecurityCam
Raspberry pi cam utilizing AWS's Kinesis Producer SDK. 
We can know offload memory resourceful tasks on to the cloud.

## About 
By leveraging the cloud we gain both Security and Functionality. This app will be divided into two directories, one for the serverless Dashboard + livestream. The Second will be for Machine Learning and business logic.

## Install
   **Client:**
   
    cd /Dashboard
    yarn 
    yarn start
    
   **Producer:**  
SSH into the PI and Navigate to where you built out the amazon-kinesis-video-streams-producer-sdk-cpp and run the install.sh or if
you already configured this you can just run gst like normal.

```
gst-launch-1.0 v4l2src device=/dev/video0 \
  ! videoconvert \
  ! video/x-raw,format=I420,width=640,height=480 \
  ! omxh264enc control-rate=2 target-bitrate=512000 periodicity-idr=45 inline-header=FALSE \
  ! h264parse ! video/x-h264,stream-format=avc,alignment=au,profile=baseline \
  ! kvssink stream-name="mytoasteroven" \
  access-key="" \
  secret-key="" \
  aws-region="us-east-1"
  ```

Dashboard will use Cognito, lambdas, and API-Gateway all backed by the Serverless Framework. 
## Demo
<img src="https://media.giphy.com/media/xvEg0tIKiz1DEkuTa5/giphy.gif" width="700" height="400">



## Architecture
 For each record written to the Kinesis data stream, the lambda function is invoked. This lambda reads the record from kinesis stream data. If there are any facial matches or mismatches, depending upon how the lambda is configured an email notification is sent via Amazon SNS 
We will be using Rekognition for the wide variety of use cases, including user verification, cataloging, people counting, and public safety.



