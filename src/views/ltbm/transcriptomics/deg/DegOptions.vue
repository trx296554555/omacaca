<template>
	<div class="DegOptions">
		<div class="DegStep">
			<p>{{ $t(`ltbm_dega.step1`) }}</p>
			<a-radio-group
				v-model:value="degParamStore.$state.degParams.gender"
				name="genderRadioGroup"
			>
				<a-radio value="a">{{ $t(`ltbm_dega.all`) }}</a-radio>
				<a-radio
					v-show="genderOptions.m.visible"
					value="m"
					:disabled="genderOptions.m.disabled"
				>
					{{ $t(`ltbm_dega.male`) }}
				</a-radio>
				<a-radio
					v-show="genderOptions.f.visible"
					value="f"
					:disabled="genderOptions.f.disabled"
				>
					{{ $t(`ltbm_dega.female`) }}
				</a-radio>
			</a-radio-group>
		</div>
		<div class="DegStep">
			<p>{{ $t(`ltbm_dega.step2`) }}</p>
			<a-radio-group
				v-model:value="degParamStore.$state.degParams.model"
				name="modelRadioGroup"
			>
				<a-tooltip placement="right">
					<template #title>{{ $t(`ltbm_dega.step2option1_tooltip`) }}</template>
					<a-radio value="M1">{{ $t(`ltbm_dega.step2option1`) }}</a-radio>
				</a-tooltip>
				<a-tooltip placement="right">
					<template #title>{{ $t(`ltbm_dega.step2option2_tooltip`) }}</template>
					<a-radio
						v-show="modelOptions.opt2.visible"
						value="M2"
						:disabled="modelOptions.opt2.disabled"
					>
						{{ $t(`ltbm_dega.step2option2`) }}
					</a-radio>
					<a-checkbox
						v-if="degParamStore.$state.degParams.model == 'M2'"
						v-model:checked="degParamStore.$state.degParams.full"
						style="font-size: 16px"
					>
						{{ $t(`ltbm_dega.step2full`) }}
					</a-checkbox>
				</a-tooltip>
				<a-tooltip placement="right">
					<template #title>{{ $t(`ltbm_dega.step2option3_tooltip`) }}</template>
					<a-radio v-show="modelOptions.opt3.visible" value="M3">
						{{ $t(`ltbm_dega.step2option3`) }}
					</a-radio>
				</a-tooltip>
				<a-tooltip placement="right">
					<template #title>{{ $t(`ltbm_dega.step2option4_tooltip`) }}</template>
					<a-radio value="M4" :disabled="modelOptions.opt4.disabled">
						{{ $t(`ltbm_dega.step2option4`) }}
					</a-radio>
				</a-tooltip>
				<a-tooltip placement="right">
					<template #title>{{ $t(`ltbm_dega.step2option5_tooltip`) }}</template>
					<a-radio value="M5" disabled>{{ $t(`ltbm_dega.step2custom`) }}</a-radio>
				</a-tooltip>
			</a-radio-group>
		</div>
		<div class="DegStep">
			<p>{{ $t(`ltbm_dega.step3`) }}</p>
			<div>
				<div class="btn-group">
					<a-button type="danger">
						{{
							degParamStore.$state.degParams.groups[0]
								? degParamStore.$state.degParams.groups[0]
								: 'Group1'
						}}
					</a-button>
				</div>
				<div class="btn-group">
					<a-button type="primary" class="my-btn-old">
						{{
							degParamStore.$state.degParams.groups[1]
								? degParamStore.$state.degParams.groups[1]
								: 'Group2'
						}}
					</a-button>
				</div>
			</div>
		</div>
		<div class="DegStep">
			<p>{{ $t(`ltbm_dega.step4`) }}</p>
			<div>
				<div class="btn-group">
					<a-button type="primary" class="my-btn-secondary" @click="resetOptions">
						<template #icon><redo-outlined /></template>
						{{ $t(`ltbm_dega.reset_btn`) }}
					</a-button>
				</div>
				<div class="btn-group">
					<a-button type="primary" @click="submit">
						<template #icon><check-outlined /></template>
						{{ $t(`ltbm_dega.submit_btn`) }}
					</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDegParamStore } from '@/store/modules/ltbmDegParam'
import { reactive } from 'vue'
import { RedoOutlined, CheckOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@/tools/useI18n'
import { message } from 'ant-design-vue'
import { router } from '@/router'
// 翻译设置
const { t } = useI18n()

const degParamStore = useDegParamStore()
const genderOptions = reactive({
	a: { visible: true, disabled: false },
	m: { visible: true, disabled: false },
	f: { visible: true, disabled: false },
})
const modelOptions = reactive({
	opt1: { visible: true, disabled: false },
	opt2: { visible: true, disabled: false },
	opt3: { visible: true, disabled: false },
	opt4: { visible: true, disabled: false },
})
// 实际的切换与显示逻辑
const changeOptions = () => {
	const ana = degParamStore.$state.degParams.analyse
	const sex = degParamStore.$state.degParams.gender
	const mod = degParamStore.$state.degParams.model
	if (ana === 'gsea') {
		genderOptions.m.visible = false
		genderOptions.f.visible = false
		modelOptions.opt2.visible = false
		modelOptions.opt3.visible = false
	} else {
		modelOptions.opt2.disabled = sex !== 'a'
		modelOptions.opt4.disabled = sex !== 'a'
		if (mod === 'M2') {
			genderOptions.m.disabled = true
			genderOptions.f.disabled = true
		} else if (mod === 'M4') {
			degParamStore.$state.degParams.full = true
			genderOptions.m.disabled = true
			genderOptions.f.disabled = true
		} else {
			degParamStore.$state.degParams.full = true
			genderOptions.m.disabled = false
			genderOptions.f.disabled = false
		}
	}
}

// 组件渲染时默认触发一次
changeOptions()

// 监听degParam状态变化，改变触发changeOptions
degParamStore.$subscribe((mutation, state) => {
	changeOptions()
})

// 绑定的4个按钮事件
const resetOptions = () => {
	degParamStore.setDegParam({ model: 'M1', full: true, gender: 'a', groups: [] })
}
const submit = () => {
	if (degParamStore.degParams.groups.length < 2) {
		message.error('You need to select two groups for comparison !')
	} else if (degParamStore.degParams.groups[0] > degParamStore.degParams.groups[1]) {
		;[degParamStore.degParams.groups[0], degParamStore.degParams.groups[1]] = [
			degParamStore.degParams.groups[1],
			degParamStore.degParams.groups[0],
		]
	}
	if (degParamStore.degParams.analyse === 'ora') {
		const { href } = router.resolve({
			path: '/ltbm/orares',
			query: {
				model: degParamStore.degParams.model,
				isFull: degParamStore.degParams.full ? 'T' : 'F',
				gender: degParamStore.degParams.gender,
				g1: degParamStore.degParams.groups[0],
				g2: degParamStore.degParams.groups[1],
			},
		})
		window.open(href, '_blank')
	} else {
		const { href } = router.resolve({
			path: '/ltbm/gseares',
			query: {
				model: degParamStore.degParams.model,
				isFull: degParamStore.degParams.full ? 'T' : 'F',
				gender: degParamStore.degParams.gender,
				g1: degParamStore.degParams.groups[0],
				g2: degParamStore.degParams.groups[1],
			},
		})
		window.open(href, '_blank')
	}
}
</script>

<style scoped lang="less">
.DegOptions {
	@apply text-lg;
}
.DegStep {
	@apply mb-3;
	& > div:not(:first-child) {
		margin-left: 1.5rem;
	}
	.btn-group {
		@apply inline-block;
		padding-top: 0.75rem;
		padding-right: 0.5rem;
	}
}
:deep(.ant-radio-wrapper) {
	font-size: 1.125rem; /* 18px */
	line-height: 1.75rem; /* 28px */
	padding: 0.375rem 0.5rem 0.375rem 0;
}
</style>
