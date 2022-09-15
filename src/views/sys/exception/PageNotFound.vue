<template>
	<div id="ErrorPage">
		<div class="error-title">
			<div class="error-title-404">{{ $t('sys.api.errTitle') }}</div>
			<div class="error-title-pnf">{{ $t('sys.api.errMsg404') }}</div>
		</div>
		<div class="error-dino">
			<iframe
				src="/res/dinosaur.html"
				title="error dino"
				style="width: 100%; height: 100%; border: 0"
			></iframe>
		</div>
		<a-button class="error-back-btn" type="dashed" @click="backToHome()">
			{{ $t('sys.exception.backHome') }}
		</a-button>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const backToHome = () => {
	router.push('/')
}
</script>
<style scoped>
#ErrorPage {
	text-align: center;
}
.error-title {
	width: 100%;
	padding: 10vh 0 30px 0;
}
.error-title-404 {
	font-size: 44px;
	font-family: 'Lato', sans-serif;
	color: #888;
	display: inline-block;
}
.error-title-pnf {
	font-size: 24px;
	font-family: 'Lato', sans-serif;
	color: #888;
}
.error-dino {
	height: 300px;
}
.error-back-btn {
	margin: 20px 0 20px 0;
}
</style>
