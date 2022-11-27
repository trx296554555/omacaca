<template>
	<div class="DegOptions">
		<div class="DegStep">
			<p>{{ $t(`ltbm_dega.step1`) }}</p>
			<a-radio-group
				v-model:value="oraParamStore.$state.degParams.gender"
				name="genderRadioGroup"
			>
				<a-radio value="a">{{ $t(`ltbm_dega.all`) }}</a-radio>
				<a-radio value="m">{{ $t(`ltbm_dega.male`) }}</a-radio>
				<a-radio value="f">{{ $t(`ltbm_dega.female`) }}</a-radio>
			</a-radio-group>
		</div>
		<div class="DegStep">
			<p>{{ $t(`ltbm_dega.step2`) }}</p>
			<a-radio-group
				v-model:value="oraParamStore.$state.degParams.model"
				name="modelRadioGroup"
			>
				<a-radio value="M1">qweqweq qweqwe</a-radio>
				<a-radio value="M2"> qweqwe e2323qweq</a-radio>
				<a-radio value="M3">eqweqwe qweqwe</a-radio>
				<a-radio value="M4">qweqwe qweqweqwe</a-radio>
			</a-radio-group>
		</div>
		<div class="DegStep">
			<p>{{ $t(`ltbm_dega.step3`) }}</p>
			<div class="btn-group">
				<a-button type="danger"
					>{{
						oraParamStore.$state.degParams.groups[0]
							? oraParamStore.$state.degParams.groups[0]
							: 'Group1'
					}}
				</a-button>
			</div>
			<div class="btn-group">
				<a-button type="primary" class="my-btn-old">{{
					oraParamStore.$state.degParams.groups[1]
						? oraParamStore.$state.degParams.groups[1]
						: 'Group2'
				}}</a-button>
			</div>
		</div>
		<div class="DegStep">
			<p>{{ $t(`ltbm_dega.step4`) }}</p>
			<div class="btn-group">
				<a-button type="primary" class="my-btn-secondary">
					<template #icon><redo-outlined /></template>
					Reset
				</a-button>
			</div>
			<div class="btn-group">
				<a-button type="primary">
					<template #icon><check-outlined /></template>
					Submit
				</a-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDegParamStore } from '@/store/modules/ltbmDegParam'
import { ref } from 'vue'
import { RedoOutlined, CheckOutlined } from '@ant-design/icons-vue'

const oraParamStore = useDegParamStore()
const value1 = ref(oraParamStore.$state.degParams.gender)
const test = ref<string>(oraParamStore.$state.degParams.gender)
console.log(value1.value)
</script>

<style scoped lang="less">
.DegOptions {
	@apply text-lg;
}
.DegStep {
	@apply mb-4;
	div:not(:first-child) {
		margin-left: 1rem;
	}
	.btn-group {
		@apply inline-block;
		padding-top: 0.75rem;
	}
}
:deep(.ant-radio-wrapper) {
	font-size: 1.125rem; /* 18px */
	line-height: 1.75rem; /* 28px */
	padding-top: 0.75rem;
	padding-right: 0.75rem;
}
</style>
