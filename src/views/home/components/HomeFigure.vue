<template>
	<div id="HomeFigure" class="HomeFigure">
		<div class="figTitle">Protect Wildlife, Protect Ourself</div>
		<div class="figNote">Don't let man be the loneliest of creatures</div>
	</div>
</template>
<style scoped lang="less">
.HomeFigure {
	height: 25rem;
	background-attachment: fixed;
	background-image: url('@img/homeFig/climbMacaca.jpg');
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	.figTitle {
		font-size: 2rem;
		font-family: 'Dancing Script', cursive;
	}

	.figNote {
		position: absolute;
		top: 58%;
		max-width: 80%;
		font-size: 14px;
	}
}
</style>
