<template>
	<div class="manage_page fillcontain">
		<el-row>
			<el-col :span="4" style="min-height:100%;width:200px">
				<el-menu :default-active="defaultActive" style="height:600px;width:100%" 
					background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true"
					theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>人事表单</template>
						<el-menu-item index="personManage">人事变动</el-menu-item>
						<el-menu-item index="infoRegist">信息登记</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-document"></i>财务表单</template>
						<el-menu-item index="receiptInvoice">收据发票</el-menu-item>
						<el-menu-item index="financialStatistics">收支利润</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-document"></i>资产表单</template>
						<el-menu-item index="materialStatictics">物资统计</el-menu-item>
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
	.el-menu-item{
		width: 100%
	}
</style>