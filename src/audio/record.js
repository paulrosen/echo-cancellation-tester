import {initGum} from "./init-gum";

export const recordAudio = (echoStyle, streamCancellation) => {

	function initialize(stream) {
		let MR = window.MediaRecorder;
		if (!MR) {
			// For edge and safari
			MR = require("./polyfill-media-recorder").MediaRecorder;
		}
		const mediaRecorder = new MR(stream);
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
					let directSource;
					const play = (onEnded) => {
						const AC = window.AudioContext || window.webkitAudioContext;
						directSource = playBack(new AC(), audioBlob, onEnded);
					};
					const stop = () => {
						directSource.stop();
					};

					resolve({play, stop});
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

function playBack(ctx, audioBlob, onEnded) {
	let directSource = ctx.createBufferSource();
	blobToAudioBuffer(ctx, audioBlob).then(audioBuffer => {
		directSource.buffer = audioBuffer;
		directSource.connect(ctx.destination);
		directSource.start(0, 0);

		directSource.onended = function () {
			onEnded();
		};
	});
	return directSource;
}

function blobToAudioBuffer(ctx, blob) {
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(blob);

		reader.addEventListener("loadend", function (e) {
			const buffer = e.srcElement.result;
			return ctx.decodeAudioData(buffer, function(audioBuffer) {
				resolve(audioBuffer);
			});
		});
	});
}
