import {bufferToWav} from "./buffer-to-wav";

export function MediaRecorder(stream) {
	this.stream = stream;
	this.onDataAvailable = undefined;
	this.onStop = undefined;
	this.isRecording = false;
	this.buffer = [];
	this.totalLength = 0;
	this.ctx = undefined;
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
		if (!this.ctx)
			this.ctx = new AudioContext();
		this.buffer = [];
		this.totalLength = 0;

		this.source = this.ctx.createMediaStreamSource(this.stream);
		this.node = (this.ctx.createScriptProcessor || this.ctx.createJavaScriptNode).call(this.ctx, 4096, 1, 1);
		this.node.onaudioprocess = this.onAudioProcess;
		this.source.connect(this.node);
		this.node.connect(this.ctx.destination);

		this.isRecording = true;
	};
	this.stop = () => {
		this.isRecording = false;
		const blob = bufferToWav(this.buffer, this.totalLength, 1, this.ctx.sampleRate);
		this.onDataAvailable({ data: blob });
		this.onStop();
	};
}

