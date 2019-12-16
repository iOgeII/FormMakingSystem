<template>
	<div>
		<head-top></head-top>
		<section class="homepage_section">
			<header class="section_title">自助表单生成系统</header>
		</section>
	</div>
</template>

<script>
	import headTop from '@/components/headTop'
	export default {
		components:{
			'head-top' : headTop
		}
	}
</script>

<style>
	.homepage_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
	}
</style>