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


						<el-button type="primary" icon="el-icon-tickets" size="small" @click="handleGenerateJson(scope.$index)">导出JSON</el-button>
						<el-dialog title="导出JSON" :visible.sync="jsonVisible" @on-close="jsonVisible = false">
							<ace id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</ace>
						</el-dialog>

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
                	form_name: '事假申请表',
                }, {
	                form_name: '病假申请表',
				},{
	                form_name: "带薪假申请表",
				},
				],
				dialogVisible: false,
				jsonVisible:false,
				configData: {},
				remoteFuncs: {},
				jsonTemplate: '',
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
			handleGenerateJson (id) {
    			this.jsonVisible = true
     			this.jsonTemplate = vacForm[id]
      			console.log(vacForm[id])
      			this.$nextTick(() => {
      				const editor = ace.edit('jsoneditor')
      				editor.session.setMode("ace/mode/json")
      				// if (!this.jsonClipboard) {
      				// 	this.jsonClipboard = new Clipboard('.json-btn')
      				// 	this.jsonClipboard.on('success', (e) => {
      				// 		this.$message.success('复制成功')
      				// 	})
      				// }
      				// this.jsonCopyValue = JSON.stringify(this.widgetForm)
      			})
      		},
		}
	}

</script>

<style>
	.table_container{
		padding: 20px;
	}
</style>