<template>
	<section class="options-section">
		<h2>Echo Cancellation Type:</h2>
		<label><input type="radio" value="None" v-model="echoStyle">None</label>
		<label><input type="radio" value="False" v-model="echoStyle">{ echoCancellation: false }</label>
		<label><input type="radio" value="Ideal" v-model="echoStyle">{ echoCancellation: { ideal: false } }</label>
		<br>
		<label><input type="checkbox" v-model="streamCancellation">Also put echo cancellation on the stream</label>
	</section>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		name: "options-section",
		watch: {
			echoStyle() {
				this.setEchoStyle(this.echoStyle);
			},
			streamCancellation() {
				this.setStreamCancellation(this.streamCancellation);
			},
		},
		data() {
			return {
				echoStyle: "False",
				streamCancellation: true,
			};
		},
		methods: {
			...mapActions(["setEchoStyle", "setStreamCancellation"]),
		}
	};
</script>

<style scoped>
	label {
		display: block;
	}
	input {
		margin-right: 10px;
	}
	.options-section {
		margin-bottom: 20px;
	}
</style>
