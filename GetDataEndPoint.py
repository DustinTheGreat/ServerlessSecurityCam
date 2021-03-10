import boto3
STREAM_NAME = "PIStream"
kvs = boto3.client("kinesisvideo")
# Grab the endpoint from GetDataEndpoint
endpoint = kvs.get_data_endpoint(
    APIName="GET_HLS_STREAMING_SESSION_URL",
    StreamName=STREAM_NAME
)['DataEndpoint']
# Grab the HLS Stream URL from the endpoint
kvam = boto3.client("kinesis-video-archived-media", endpoint_url=endpoint)
url = kvam.get_hls_streaming_session_url(
    StreamName=STREAM_NAME,
    PlaybackMode="LIVE"
)['HLSStreamingSessionURL']

print(url)
# import HTML
# HTML(data='<video src="{0}" autoplay="autoplay" controls="controls" width="300" height="400"></video>'.format(url)) 




import webbrowser

f = open('index.html','w')

message = """<html>
<head></head>
<body><p>Hello World!</p></br><video src='%s' autoplay="autoplay" controls="controls" width="300" height="400"></video></body>
</html>"""
x = message % (url)
print(x)
f.write(x)
f.close()

#Change path to reflect file location
filename = '/home/costanza/Tools/' + 'index.html'
webbrowser.open_new_tab(filename)