import {initGum} from "./init-gum";

export const recordAudio = (echoStyle, streamCancellation) => {

	function initialize(stream) {
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
		return Promise.resolve({start, stop});
	}

	return initGum(echoStyle, streamCancellation).then(stream => {
		return initialize(stream);
	});
};
