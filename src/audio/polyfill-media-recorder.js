import {bufferToWav} from "./buffer-to-wav";

let ctx;

export function MediaRecorder(stream) {
	this.stream = stream;
	this.onDataAvailable = undefined;
	this.onStop = undefined;
	this.isRecording = false;
	this.buffer = [];
	this.totalLength = 0;
	this.node = undefined;
	this.source = undefined;

	this.onAudioProcess = (e) => {
		if (this.isRecording) {
			const cd = e.inputBuffer.getChannelData(0);
			this.buffer.push(new Float32Array(cd));
			this.totalLength += cd.length;
		}
	};
	this.addEventListener = (event, callback) => {
		if (event === "dataavailable")
			this.onDataAvailable = callback;
		if (event === "stop")
			this.onStop = callback;
	};
	this.start = () => {
		if (!ctx) {
			const AC = window.AudioContext || window.webkitAudioContext;
			ctx = new AC();
		}
		this.buffer = [];
		this.totalLength = 0;

		this.source = ctx.createMediaStreamSource(this.stream);
		this.node = (ctx.createScriptProcessor || ctx.createJavaScriptNode).call(ctx, 4096, 1, 1);
		this.node.onaudioprocess = this.onAudioProcess;
		this.source.connect(this.node);
		this.node.connect(ctx.destination);

		this.isRecording = true;
	};
	this.stop = () => {
		this.isRecording = false;
		const blob = bufferToWav(this.buffer, this.totalLength, 1, ctx.sampleRate);
		this.onDataAvailable({ data: blob });
		this.onStop();
	};
}

