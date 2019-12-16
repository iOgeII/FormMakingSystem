<template>
	<div class="fillcontain">
		<head-top></head-top>
		<div class="table_container">
			<el-table :data="tableData" highlight-current-row style="width: 100%" >
<!-- 			    <el-table-column type="index"></el-table-column> -->
				<el-table-column property="form_name" label="表名" width="500"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-view" size="small" @click="handlePreview(scope.$index)">预览</el-button>
						<el-dialog title="预览" :visible.sync="dialogVisible" :before-close="handleClose">
							<exist-form v-if="dialogVisible"
								insite="true"
								:data = "configData"
								remote="remoteFuncs" 
								ref="existForm">
							</exist-form>
							<span slot="footer" class="dialog-footer">
								<el-button @click="dialogVisible = false">取 消</el-button>
								<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
							</span>
						</el-dialog>


						<el-button type="primary" icon="el-icon-tickets" size="small">导出JSON</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import headTop from '@/components/headTop'
	import existForm from '@/components/ExistForm'
	import {vacForm} from '@/components/testForm.js'

	export default {
		components: {
			headTop,
			existForm
		},
		data(){
			return {
				tableData: [{
                	form_name: '入职登记表',
                }, {
	                form_name: '离职登记表',
				}, {
	                form_name: '职务变动登记表',
				},
				],
				dialogVisible: false,
				configData: {},
				remoteFuncs: {}
			}
		},
		methods: {
			handlePreview (id) {
				const config = vacForm[id]
				this.configData = config // 将配置信息传递到 GenerateForm 中
				this.dialogVisible = true			
			},
			handleClose (done) {
				this.dialogVisible = false
			},

		}
	}

</script>

<style>
	.table_container{
		padding: 20px;
	}
</style>
