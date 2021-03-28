# ServerlessSecurityCam
Raspberry pi cam utilizing AWS's Kinesis Producer SDK. 
We can know offload memory resourceful tasks on to the cloud.

## About 
By leveraging the cloud we gain both Security and Functionality. This app will be divided into two directories, one for the serverless web analytics + livestream dashboard. The Second will be for parsing and analytics, and should act as a basic c&c server. 

## Install
   **Client**
   
    cd /Dashboard
    yarn 
    yarn start
    
   **Producer**  
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

We are going off the Brain_Power_fidgetology for Machine learning, just subsitute the webcam for the Raspberry Pi w/ SDK

