#!/bin/sh
apt-get update
apt-get -y upgrade
apt-get dist-upgrade
cd /amazon-kinesis-video-streams-producer-sdk-cpp
modprobe bcm2835-v4l2
export GST_PLUGIN_PATH=`pwd`/build
export LD_LIBRARY_PATH=`pwd`/open-source/local/lib
gst-launch-1.0 v4l2src do-timestamp=TRUE device=/dev/video0 \
  ! videoconvert
  ! video/x-raw,format=I420,width=640,height=480,framerate=30/1
  ! omxh264enc control-rate=1 target-bitrate=51200 periodicty-idr=45 inline-header=FALSE
  ! h264parse 
  ! video/x-h264,stream-format=avc,alignment=au,width=640,height=480,framerate=30/1,profile=baseline
  ! kvssink stream-name="PiStream3"
     access-key=""
     secret-key=""
     aws-region="us-east-1"
