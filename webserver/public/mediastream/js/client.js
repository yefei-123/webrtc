'use strict'
var videoplay = document.querySelector('video#player');
function getMediaStream(stream)
{
	videoplay.srcObject = stream;
}
function handleError(error)
{
	console.log('getUserMedia error:',error);
}
if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
{
	console.log("getUserMedia is not supported");
}
else
{
	var constrants = {
		video : {
			height:1080,
			wight:1920,
			frmate:30
		},
		audio : true
	};
	navigator.mediaDevices.getUserMedia(constrants).then(getMediaStream).catch(handleError);
}
