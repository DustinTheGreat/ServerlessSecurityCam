import boto3
import webbrowser

# STREAM_NAME = "PIStream"
# kvs = boto3.client("kinesisvideo")
# # Grab the endpoint from GetDataEndpoint
# endpoint = kvs.get_data_endpoint(
#     APIName="GET_HLS_STREAMING_SESSION_URL",
#     StreamName=STREAM_NAME
# )['DataEndpoint']


def main():
	print("Grabbing Session Steaming Session")
	print("----------------------------------")
	url = get_streaming_session()
	print("Opening Stream")
	print("----------------------------------")
	open_media(url)



	# Grab the HLS Stream URL from the endpoint
def get_streaming_session():


	kvs = boto3.client("kinesisvideo")
	# Grab the endpoint from GetDataEndpoint
	endpoint = kvs.get_data_endpoint(
	    APIName="GET_HLS_STREAMING_SESSION_URL",
	    StreamName="PiStream3"
	)['DataEndpoint']


	kvs = boto3.client("kinesisvideo")
	kvam = boto3.client("kinesis-video-archived-media", endpoint_url=endpoint)
	url = kvam.get_hls_streaming_session_url(
	    StreamName="PiStream3",
	    PlaybackMode="LIVE"
	)['HLSStreamingSessionURL']

	return(url)

def open_media(url):
	f = open('index.html','w')

	message = """<html>
	<head></head>
	<body><p>Hello World!</p></br><video src='%s' autoplay="autoplay" controls="controls" width="300" height="400"></video></body>
	</html>"""
	x = message % (url)
	print(x)
	f.write(x)
	f.close()

	#TODO: make user path for pi systems
	filename = '/home/costanza/Tools/' + 'index.html'
	webbrowser.open_new_tab(filename)

if __name__ == '__main__':
	main()