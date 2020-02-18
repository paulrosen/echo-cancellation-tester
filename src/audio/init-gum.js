export const initGum = (echoStyle, streamCancellation) => {
	let constraints;
	switch (echoStyle) {
		case "None":
			constraints = { audio: true };
			break;
		case "True":
			constraints = { audio: { echoCancellation: true } };
			break;
		case "False":
			constraints = { audio: { echoCancellation: false } };
			break;
		case "Ideal":
			constraints = { audio: { echoCancellation: { ideal: false } } };
			break;
	}
	return navigator.mediaDevices.getUserMedia(constraints).then(stream => {
		if (streamCancellation) {
			const audioTracks = stream.getAudioTracks();
			let promises = [];
			audioTracks.forEach(track => {
				promises.push(track.applyConstraints({echoCancellation: false}));
			});
			return Promise.all(promises).then(() => {
				return Promise.resolve(stream);
			});
		} else
			return Promise.resolve(stream);
	});
};
