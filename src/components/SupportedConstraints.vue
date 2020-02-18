<template>
	<section class="supported-constraints">
		<h2>Supported Constraints:</h2>
		<div v-html="supportedConstraints"></div>
	</section>
</template>

<script>
	export default {
		name: "supported-constraints",
		data() {
			return {
				supportedConstraints: "",
			};
		},
		mounted() {
			const supported = navigator.mediaDevices.getSupportedConstraints();
			let constraints = [];
			Object.keys(supported).forEach(key => {
				constraints.push(`${key}: ${supported[key]}`);
			});
			this.supportedConstraints = constraints.join("<br>");
		},
	}
</script>

<style scoped>
	.supported-constraints {
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
