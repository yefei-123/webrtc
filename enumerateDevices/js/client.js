'use strict'

var audioSource = document.querySelector("select#audioSource");
var audioOutput = document.querySelector("select#audioOutput");
var videoSource = document.querySelector("select#videoSource");

function getMediaStream(stream)
{
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


if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
{
	console.log("不支持 mediaDevices或者getUserMedia");
}
else
{
	//navigator.mediaDevices.enumerateDevices().then(getDeviceInforsucess).catch(getDeviceInforfail);
	navigator.mediaDevices.getUserMedia({video:false, audio:true})
		.then(getMediaStream)
		.then(getDeviceInforsucess)
		.catch(getDeviceInforfail);
}

