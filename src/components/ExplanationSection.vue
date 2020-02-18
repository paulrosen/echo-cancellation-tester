<template>
	<section class="explanation-section">
		<p>This will test whether Echo Cancellation has been turned off. To run it you need a computer with both a microphone and speakers and they should be close to each other. (That is, don't use headphones and have a reasonable volume for the speakers so that the microphone will pick up the sound from the speakers.)</p>
		<ol>
			<li>Click "Record".</li>
			<li>Accept the browser's recording permission notice.</li>
			<li>You should hear a short tune play, then a "Play" button will appear.</li>
			<li>Click "Play". If echo cancellation was successfully turned off, then you will hear the tune. If echo cancellation is still on, then you will probably hear drop outs in the recording when the notes where sounding.</li>
			<li>Try a number of different combinations of options to see what makes a difference.</li>
		</ol>
	</section>
</template>

<script>
	export default {
		name: "explanation-section",
	}
</script>

<style scoped>

</style>
