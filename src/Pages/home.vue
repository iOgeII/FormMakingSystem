<template>
	<div>
		<head-top></head-top>
		<div class="homepage_section">
			<header class="section_title">自助表单生成系统</header>
			<p class="introduction">快速生成页面表单的json和html代码，助力您的页面开发。</p>
			<el-row style="padding-top:20px">
  				<el-col :span="24"><div class="grid-content bg-purple-dark">应用场景</div></el-col>
			</el-row>
			<el-carousel :interval="2000" type="card" height="300px">
    			<el-carousel-item v-for="item in rollimg" :key="item.value">
					<img class="carousel-image" :src="item.src">
    			</el-carousel-item>
  			</el-carousel>
		</div>
	</div>
</template>

<script>
	import headTop from '@/components/headTop'
	export default {
		components:{
			'head-top' : headTop
		},
		data() {
			return {
				rollimg: [
					{
						src: require('../assets/roll1.jpg')
					},
					{
						src: require('../assets/roll2.jpg')
					},
					{
						src: require('../assets/roll3.jpg')
					},
					{
						src: require('../assets/roll4.jpg')
					}
				]
			}
		}
	}
</script>

<style>
	.homepage_section{
		padding: 20px;
		margin-bottom: 40px;

	}
	.section_title{
		text-align: center;
		font-size: 30px;
		margin-bottom: 10px;
	}
	.introduction{
		text-align: right;
		font-size: 15px;
		font-style: italic; 
		padding-right: 20px;
		color: #4a74af;
	}
	.el-row {
    	margin-bottom: 20px;
  	}
  	.el-col {
    	border-radius: 4px;
  	}
  	.bg-purple-dark {
    	background: rgb(253, 253, 253);
		font-size: 24px;
		color: #99a9bf;
  	}
  	.bg-purple {
    	background: #d3dce6;
  	}
  	.bg-purple-light {
    	background: #e5e9f2;
  	}
  	.grid-content {
    	border-radius: 4px;
    	min-height: 36px;
	    vertical-align: middle;
		text-align: center;
  	}
  	.row-bg {
    	padding: 10px 0;
    	background-color: #f9fafc;
  	}
	.el-carousel__item{
    	color: #475669;
    	font-size: 14px;
   		opacity: 0.95;
    	line-height: 200px;
    	margin: 0;
		/* width: 100%; */
  		display: flex;
  		align-items: center;
  		justify-content: center;
  	}	
  	.carousel-image {
    	max-width: 100%;
    	max-height: 100%;
  	}
  	.el-carousel__item:nth-child(2n) {
    	background-color: #99a9bf;
  	}
  	.el-carousel__item:nth-child(2n+1) {
    	background-color: #d3dce6;
  	}
</style>