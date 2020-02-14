export const recordAudio = (echoStyle, streamCancellation) => {
	let constraints;
	switch (echoStyle) {
		case "None":
			constraints = { audio: true };
			break;
		case "False":
			constraints = { audio: { echoCancellation: false } };
			break;
		case "Ideal":
			constraints = { audio: { echoCancellation: { ideal: false } } };
			break;
	}

	function initialize(stream, resolve) {
		const mediaRecorder = new MediaRecorder(stream);
		const audioChunks = [];

		mediaRecorder.addEventListener("dataavailable", event => {
			audioChunks.push(event.data);
		});

		const start = () => {
			mediaRecorder.start();
		};

		const stop = () => {
			return new Promise(resolve => {
				mediaRecorder.addEventListener("stop", () => {
					const audioBlob = new Blob(audioChunks);
					const audioUrl = URL.createObjectURL(audioBlob);
					const audio = new Audio(audioUrl);
					const play = (onEnded) => {
						if (onEnded) {
							audio.addEventListener("ended", () => {
								onEnded();
							});
						}
						audio.play();
					};
					const pause = () => {
						audio.pause();
					};

					resolve({audioBlob, audioUrl, play, pause});
				});

				stream.getTracks().forEach(track => track.stop());
				mediaRecorder.stop();
			});
		};
		return resolve({start, stop});
	}

	return new Promise(resolve => {
		return navigator.mediaDevices.getUserMedia(constraints)
			.then(stream => {
				if (streamCancellation) {
					return stream.getAudioTracks()[0].applyConstraints({echoCancellation: false}).then(() => {
						return initialize(stream, resolve);
					});
				} else
					return initialize(stream, resolve);
			}).catch(error => {
				console.log("Initialization error:", error);
			});
	});
};
