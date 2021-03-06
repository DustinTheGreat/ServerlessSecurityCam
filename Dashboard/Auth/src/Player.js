import ReactPlayer from 'react-player'
import AWS from "aws-sdk";
import React, { useEffect, useState, useRef } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const Player = () => {
    const [connections, setConnections] = useState([])

    const streamName = "PiStream3";

    const options = {
        accessKeyId: "AKIA56YUOEMNYXIHZ3FO",
        secretAccessKey: "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",
        region: "us-east-1"
    }
    const kinesisVideo = new AWS.KinesisVideo(options);
    const kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia(options);



    useEffect(() => {
      getEndpoint()
        if (1==1) {
            setTimeout(() => {
              getStream()
            }, 5000)
        }
    }, [])

    const getEndpoint = () => {
      kinesisVideo.getDataEndpoint({
          StreamName: streamName,
          APIName: "GET_HLS_STREAMING_SESSION_URL"
      }, function(err, response) {
          if (err) { return console.error(err); }
          console.log('Data endpoint: ' + response.DataEndpoint);
          kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);

      });
    }

    const getStream = () => {
      console.log('Fetching HLS Streaming Session URL');
      var playbackMode = 'LIVE'; // 'LIVE' or 'ON_DEMAND'
      //var startTimestamp = new Date('START_TIMESTAMP'); // For ON_DEMAND only
      //var endTimestamp = new Date('END_TIMESTAMP'); // For ON_DEMAND only
      var fragmentSelectorType = 'SERVER_TIMESTAMP'; // 'SERVER_TIMESTAMP' or 'PRODUCER_TIMESTAMP'
      const SESSION_EXPIRATION_SECONDS = 60*60
      console.log(kinesisVideo)
      const hlsUrl = kinesisVideoArchivedContent.getHLSStreamingSessionURL({
          StreamName: streamName,
          //StreamARN: "arn:aws:kinesisvideo:us-east-1:635420739373:stream/mr-pinchers-dot-org/1561848963391",
          PlaybackMode: playbackMode,
          HLSFragmentSelector: {
              FragmentSelectorType: fragmentSelectorType,
              TimestampRange: playbackMode === 'LIVE' ? undefined : {
      //            StartTimestamp: startTimestamp,
      //            EndTimestamp: endTimestamp
              }
          },
          Expires: parseInt(SESSION_EXPIRATION_SECONDS)
      }, function(err, response) {
          if (err) { return console.error("Darn", err); }
          console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL, response);
          setConnections((prevState) => [...prevState, response.HLSStreamingSessionURL])
          console.log("connections:", connections)

        }
      )


    }

    return (

        <div>

        
      {connections ==0 ? (
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
      ) : (
      <center>
          <h1>Live Feed<h1>
         <ReactPlayer url={connections[0]} playing={true} />
      </center>
      )}


        </div>
    )
}

export default Player;





