<template>
	<div>123</div>
	<div style="height: 1200px"></div>

	<a-timeline style="padding-left: 30px">
		<a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
		<a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
		<a-timeline-item color="red">
			<template #dot><div>2015-09-01</div></template>
			Technical testing 2015-09-01
		</a-timeline-item>
		<a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
	</a-timeline>
</template>

<script>
export default {
	name: 'Introduction',
}
</script>

<style scoped></style>
