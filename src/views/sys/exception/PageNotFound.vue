<template>
	<div id="ErrorPage">
		<div class="error-title">
			<div class="error-title-404">Error 404</div>
			<div class="error-title-pnf">Sorry! Page not found~</div>
		</div>
		<div class="error-dino">
			<iframe
				src="/res/dinosaur.html"
				title="error dino"
				style="width: 100%; height: 100%; border: 0"
			></iframe>
		</div>
		<a-button class="error-back-btn" type="dashed" @click="$router.go(-1)"
			>Back to Home</a-button
		>
	</div>
</template>
<style scoped="scoped">
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
	font-size: 34px;
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
