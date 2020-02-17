<template>
	<section class="recording-section">
		<div class="error" v-if="error">{{error}}</div>
		<div>
			<button @click="record" v-if="!hasRecorded">Record</button>
			<button @click="play" v-if="audio !== null && !isPlaying">Play</button>
			<button @click="pause" v-if="isPlaying">Pause</button>
		</div>
		<div>
			<button @click="tryAgain" v-if="hasPlayed">Try Again</button>
		</div>
	</section>
</template>

<script>
	import abcjs from 'abcjs';
	import {recordAudio} from '../audio/record';
	import { mapGetters } from "vuex";

	export default {
		name: "recording-section",
		data() {
			return {
				error: "",
				hasRecorded: false,
				hasPlayed: false,
				isPlaying: false,
				audio: null,
				abc: `X:1
L:1/4
M:4/4
Q:1/4=180
K:F
.[Acf] _a/=a c/d | .f z .a z | f f a a | f f a2 | c'/c'/c'/z/ _a/ =a |fz z2 |[F,,F,]4 | z4 |]
`,
			};
		},
		methods: {
			...mapGetters(['echoStyle', 'streamCancellation']),
			record() {
				this.hasRecorded = true;
				recordAudio(this.echoStyle(), this.streamCancellation()).then(response => {
					this.recorder = response;
					this.loadSynthBuffer().then(response => {
						this.recorder.start();
						response.midiBuffer.start();
					})
				}).catch(error => {
					console.log(error)
					this.error = error;
				});
			},
			onEnded() {
				this.hasPlayed = true;
				this.isPlaying = false;
			},
			play() {
				this.isPlaying = true;
				this.audio.play(this.onEnded);
			},
			pause() {
				this.isPlaying = false;
				this.hasPlayed = true;
				this.audio.pause();
			},
			tryAgain() {
				this.hasRecorded = false;
				this.hasPlayed = false;
				this.isPlaying = false;
				this.audio = null;
			},
			synthEnded() {
				this.recorder.stop().then(response => {
					this.audio = response;
				});
			},
			loadSynthBuffer() {
				const visualObj = abcjs.renderAbc("*", this.abc)[0];
				const midiBuffer = new abcjs.synth.CreateSynth();

				// midiBuffer.init preloads and caches all the notes needed. There may be significant network traffic here.
				return midiBuffer.init({
					visualObj: visualObj,
					millisecondsPerMeasure: visualObj.millisecondsPerMeasure(),
					onEnded: this.synthEnded
				}).then(() => {
					return midiBuffer.prime();
				}).then(() => {
					return Promise.resolve({ midiBuffer: midiBuffer });
				});
			},
		},
	}
</script>

<style scoped>
	button {
		padding: 10px 30px;
		border: 1px solid #3B305D;
		color: #3B305D;
		background: #ffffff;
		font-size: 15px;
		font-weight: 600;
		border-radius: 6px;
		text-align: center;
		width: auto;
		margin-bottom: 30px;
	}
	button:hover {
		background: #fbd2fb;
	}
	.error {
		border: 2px solid red;
		color: red;
		padding: 20px;
		margin-bottom: 20px;
	}

</style>
