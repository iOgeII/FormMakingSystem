<template>
	<div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/manage'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- <el-dropdown @command="handleCommand" menu-align='start'>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown> -->
	</div>
</template>

<script>
	export default {
		// methods: {
		// 	async handleCommand(command) {
		// 		if(command == "home") {
		// 			this.$router.push('/home');
		// 		}
		// 	},
		// }
	}
</script>

<style>
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.el-dropdown-item{
		height: 60px;
        text-align: center;
        padding-right: 20px;
    }
	
</style>