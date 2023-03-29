'use strict'

var audioSource = document.querySelector('select#audioSource');
var audioOutput = document.querySelector('select#audioOutput');
var videoSource = document.querySelector('select#videoSource');

var videoplay = document.querySelector('video#player');

function getMediaStream(stream)
{
	videoplay.srcObject  =  stream;
	return navigator.mediaDevices.enumerateDevices();
}
function getDeviceInforsucess(deviceInfos)
{
	deviceInfos.forEach(function (deviceInfo)
	{
		console.log(deviceInfo.kind 
			+ ": label=" + deviceInfo.label 
			+ ": id=" + deviceInfo.deviceId 
			+ ": groupId=" + deviceInfo.groupId);

	var option = document.createElement('option');
	option.text = deviceInfo.label;
	option.value = deviceInfo.deviceId;
	if(deviceInfo.kind === 'audioinput')
	{
		console.log("kind:"+deviceInfo.kind);
		audioSource.appendChild(option);
	}
	else if(deviceInfo.kind === 'audiooutput')
	{
		audioOutput.appendChild(option);

	}
	else if(deviceInfo.kind === 'videoinput')
	{
		videoSource.appendChild(option);

	}
	});
	
}

function getDeviceInforfail(err)
{
	console.log(err.name + " : " + err.message);
	
}


function  start()
{
	if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
	{
		console.log("不支持 mediaDevices或者getUserMedia");
		return;
	}
	else
	{
		var deviceId = videoSource.value;
		var constrants = {
			video :{
				weight:1920,
				height:1080,
				facingMode:'enviroment',
				deviceId: deviceId ? deviceId : undefined
				
			},
			audio:{
				volume:10,
				echoCancellation:true
			}
		}; 
		navigator.mediaDevices.getUserMedia(constrants)
			.then(getMediaStream)
			.then(getDeviceInforsucess)
			.catch(getDeviceInforfail);
	}
}

start();

videoSource.onchange = start;