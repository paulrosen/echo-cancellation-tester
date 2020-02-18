<template>
	<section class="code-example">
		<div class="indent0">return new Promise(resolve => {</div>
		<div class="indent1">return navigator.mediaDevices.getUserMedia(</div>
		<div class="indent2"><span class="emphasis">{{gumParams}})</span></div>
		<div class="indent2">.then(stream => {</div>
		<div class="indent3 emphasis" v-if="streamCancellation()">return stream.getAudioTracks()[0]</div>
		<div class="indent4 emphasis" v-if="streamCancellation()">.applyConstraints(</div>
		<div class="indent4 emphasis" v-if="streamCancellation()">{echoCancellation: false}).then(() => {</div>
		<div :class="streamCancellation() ? 'indent4' : 'indent3'">return initialization();</div>
		<div class="indent3" v-if="streamCancellation()">});</div>
});
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: "code-example",
		computed: {
			gumParams() {
				switch(this.echoStyle()) {
					case "None":
						return "{ audio: true }";
					case "True":
						return "{ audio: { echoCancellation: true } }";
					case "False":
						return "{ audio: { echoCancellation: false } }";
					case "Ideal":
						return "{ audio: { echoCancellation: { ideal: false } } }";
				}
			},
		},
		methods: {
			...mapGetters(['echoStyle', 'streamCancellation']),
		},
	}
</script>

<style scoped>
	.code-example {
		background: #000000;
		color: #ffffff;
		border: 2px solid #ffffff;
		padding: 10px;
		font-family: Monaco, "Courier New", monospace;
	}
	.indent1 {
		padding-left: 22px;
	}
	.indent2 {
		padding-left: 44px;
	}
	.indent3 {
		padding-left: 66px;
	}
	.indent4 {
		padding-left: 88px;
	}
	.emphasis {
		background: #ffffff;
		color: #000000;
	}
</style>
