<template>
	<div class="fillcontain">
		<head-top></head-top>
		<div class="table_container">
			<el-table :data="tableData" highlight-current-row style="width: 100%">
				<el-table-column property="form_name" label="表名" width="600"></el-table-column>
				<el-table-column label="操作">
					
					<el-button type="primary" icon="el-icon-view" size="small" @click="dialogFormVisible = true">预览</el-button>
					<el-dialog title="预览" :visible.sync="dialogFormVisible">
						<el-form :model="form">
							<el-form-item label="表单名称" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="表单选项" :label-width="formLabelWidth">
								<el-select v-model="form.region" placeholder="请选择">
									<el-option label="选项一" value="1a"></el-option>
									<el-option label="选项二" value="1b"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-dialog>
					
					<el-button type="primary" icon="el-icon-tickets" size="small">导出JSON</el-button>
				
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import headTop from '@/components/headTop'

	export default {
		data(){
			return {
				tableData: [{
                	form_name: '个人信息登记表',
                }, {
	                form_name: '履历信息登记表',
				},
				],
				dialogFormVisible: false,

				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px',
				
				currentRow: null,
				offset: 0,
				limit: 20,
				count: 0,
				currentPage: 1,
			}
		},
		components: {
			headTop,
		},

	}

</script>

<style>
	.table_container{
		padding: 20px;
	}
</style>