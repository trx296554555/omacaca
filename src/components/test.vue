<template>
	<div>123</div>
</template>

<script setup lang="ts">
const mySum: (x: number, y: number) => number = function (x: number, y: number): number {
	return x + y
}
console.log(mySum(1, 2))
</script>
