<template>
	<div class="timeline">
		<!-- stageA -->
		<span class="timeline-stamp">2019-09-26</span>
		<a-card title="Stage-A" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					6 Months </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-1</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.stagea') }}</p>
			<img src="@img/ltbmFig/LtbmBreastfeedMonkey.jpg" alt="BreastfeedMonkey" />
		</a-card>
		<!-- stageA note -->
		<a-card class="timeline-card">
			<strong>Notes</strong>
			<li>{{ $t('ltbm_introduction.stageanote') }}</li>
		</a-card>
		<!--stageM-->
		<a-card title="Stage-Mother" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					7 Years avg </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-1</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.stagem') }}</p>
		</a-card>
		<!-- stageB -->
		<span class="timeline-stamp">2019-10-11</span>
		<a-card title="Stage-B" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					6.5 Months </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-15</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.stageb') }}</p>
			<img src="@img/ltbmFig/LtbmInCubCircle.jpg" alt="InCubCircle" />
		</a-card>
		<!-- stageC -->
		<span class="timeline-stamp">2019-11-12</span>
		<a-card title="Stage-C" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					7.5 Months </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-47</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.stagec') }}</p>
		</a-card>
		<!-- stageC note -->
		<a-card class="timeline-card">
			<strong>Notes</strong>
			<li>{{ $t('ltbm_introduction.stagecnote') }}</li>
		</a-card>
		<!-- stageD -->
		<span class="timeline-stamp">2019-12-06</span>
		<a-card title="Stage-D" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					8.5 Months </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-71</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.staged') }}</p>
			<img src="@img/ltbmFig/LtbmInCage.jpg" alt="InCage" />
		</a-card>
		<!-- stageD note -->
		<a-card class="timeline-card">
			<strong>Notes</strong>
			<li>{{ $t('ltbm_introduction.stagednote') }}</li>
		</a-card>
		<!-- stageE -->
		<span class="timeline-stamp">2020-01-08</span>
		<a-card title="Stage-E" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					9.5 Months </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-104</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.stagee') }}</p>
		</a-card>
		<!-- stageF -->
		<span class="timeline-stamp">2020-06-11</span>
		<a-card title="Stage-F" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					14.5 Months </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-259</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.stagef') }}</p>
			<img src="@img/ltbmFig/LtbmInBigCage.jpg" alt="InBigCage" />
		</a-card>
		<!-- stageF note -->
		<a-card class="timeline-card">
			<strong>Notes</strong>
			<li>{{ $t('ltbm_introduction.stagefnote') }}</li>
		</a-card>
		<!-- stageG -->
		<span class="timeline-stamp">2021-01-06</span>
		<a-card title="Stage-G" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					21.5 Months </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-468</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.stageg') }}</p>
		</a-card>
		<!-- stageG note -->
		<a-card class="timeline-card">
			<strong>Notes</strong>
			<li>{{ $t('ltbm_introduction.stagegnote') }}</li>
		</a-card>
		<!--stageO-->
		<span class="timeline-stamp">2021-08-30</span>
		<a-card title="Stage-Others" class="timeline-card">
			<template #extra
				><a-tag color="success">
					<template #icon>
						<moonIcon></moonIcon>
					</template>
					8 Years avg </a-tag
				><a-tag color="success">
					<template #icon><clock-circle-outlined /> </template>
					DAY-704</a-tag
				></template
			>
			<p>{{ $t('ltbm_introduction.stageo') }}</p>
		</a-card>
	</div>
</template>

<script setup lang="ts">
//
import { ClockCircleOutlined } from '@ant-design/icons-vue'
import { useThemeStoreWithOut } from '@/store/modules/theme'
</script>

<style scoped lang="less">
.timeline {
	border-left: 3px solid @primary-color;
	padding-top: 1rem;
	padding-bottom: 1.5rem;
}

.timeline-stamp {
	display: inline-flex;

	color: @white-color;
	background-color: @primary-color;
	opacity: 1;

	margin-bottom: 1.25rem;
	padding: 0.5rem 1.5rem 0.5rem 1.5rem;
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: uppercase;
}

.timeline-card {
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24);
	border-radius: 5px;
	border-left: 3px solid @primary-color;
	margin: 0 0 1.5rem 1rem;
	p {
		font-size: 1rem;
		text-indent: 2em;
	}
	img {
		padding-top: 1rem;
	}
	li {
		font-size: 0.5rem;
		text-indent: 0.5em;
		list-style: disc;
	}
}

:deep(.ant-tag) {
	border: none;
}
</style>
