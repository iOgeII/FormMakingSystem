<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%">
			<el-col :span="4" style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>人事表单</template>
						<el-menu-item index="personManage">人事变动</el-menu-item>
						<el-menu-item index="infoRegist">信息登记</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-document"></i>其他表单</template>
						<el-menu-item index="vacationApplication">休假申请</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>自助表单</template>
						<el-menu-item index="draggingPage">拖拽生成</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
	}
</script>

<style>
	
</style>