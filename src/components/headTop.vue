<template>
	<div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{path: '/manage'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- <el-dropdown class="dropdown_container" @command="handleCommand" menu-align='start' trigger="click"> -->
		<el-dropdown class="dropdown_container" @command="handleCommand" trigger="click">
			<span class="el-dropdown-link">菜单
   				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首  页</el-dropdown-item>
				<el-dropdown-item command="signout">退  出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
        mounted(){
        },
		methods: {
			async handleCommand(command) {
				if(command == "home") {
					this.$router.push('/manage');
				}
				else if(command == "signout"){
					this.$router.push('/login');
					// window.location.reload();
				}
			},
		}
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
	.dropdown_container{
		height: 65%;
		width: 100px;
		display: table-cell;
		vertical-align:middle;
		text-align:center;
		padding-top: 17px;
		padding-right: 20px;
	}
	.el-dropdown-link {
		font-size: 14px;
		height: 100%;
    	cursor: pointer;
    	color: #409EFF;
		text-align: center;
  	}
  	.el-icon-arrow-down {
    	font-size: 12px;
  	}
	.el-dropdown-menu{
		width: 80px;
        text-align: center;
    }
	
</style>