#!/bin/sh
apt-get update
apt-get -y upgrade
apt-get dist-upgrade
cd /amazon-kinesis-video-streams-producer-sdk-cpp
modprobe bcm2835-v4l2
export GST_PLUGIN_PATH=`pwd`/build
export LD_LIBRARY_PATH=`pwd`/open-source/local/lib
gst-launch-1.0 v4l2src device=/dev/video0 \
! videoconvert \
! video/x-raw,format=I420,width=640,height=480 \
! omxh264enc control-rate=2 target-bitrate=512000 periodicity-idr=45 inline-header=FALSE \
! h264parse ! video/x-h264,stream-format=avc,alignment=au,profile=baseline \
! kvssink stream-name="mytoasteroven" \
access-key="" \
secret-key="" \
aws-region="us-east-1"

