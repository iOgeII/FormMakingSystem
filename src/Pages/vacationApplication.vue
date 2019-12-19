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
						<el-button type="primary" icon="el-icon-tickets" size="small" @click="handleGenerateJson(scope.$index)">生成JSON</el-button>
						<el-button type="primary" icon="el-icon-tickets" size="small" @click="handleGenerateHtml(scope.$index)">生成代码</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="预览" :visible.sync="previewVisible" @on-close="handleClose" width="900px" form>
			<exist-form v-if="previewVisible" :data = "configData" :remote="remoteFuncs" insite="true" ref="existForm"></exist-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="previewVisible = false">取 消</el-button>
				<el-button type="primary" @click="previewVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导出JSON" :visible.sync="jsonVisible" @on-close="jsonVisible = false" width="900px">
<!-- 			<vue-editor v-model="jsonTemplate" :editorToolbar="customToolbar"></vue-editor> -->
			<ace :modePath="editorMode.json" :content="jsonTemplate"></ace>
		</el-dialog>

		<el-dialog title="导出Html" :visible.sync="htmlVisible" @on-close="htmlVisible = false" width="900px">
<!-- 			<vue-editor v-model="jsonTemplate" :editorToolbar="customToolbar"></vue-editor> -->
			<ace :modePath="editorMode.html" :content="htmlTemplate"></ace>
		</el-dialog>
	</div>
</template>

<script>
	import headTop from '@/components/headTop'
	import existForm from '@/components/ExistForm'
	import { vacForm } from '@/components/testForm.js'
	import { VueEditor } from 'vue2-editor'
	import ACE from '@/components/aceCustom'

	export default {
		components: {
			headTop,
			existForm,
			VueEditor,
			ace: ACE
		},
		data(){
			return {
				tableData: [{
                	form_name: '事假申请表',
                }, {
	                form_name: '病假申请表',
				},{
	                form_name: '带薪假申请表',
				},
				],
				previewVisible: false,
				jsonVisible:false,
				htmlVisible:false,
				configData: {},
				remoteFuncs: {},
				jsonTemplate: '',
				htmlTemplate: '',
        		// customToolbar: [
          //   		['bold', 'italic', 'underline'],
          //   		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
          //   		[{ 'indent': '-""' }, { 'indent': '+""' }],
          //   		[{ 'header': '2' }], ['clean'], [{ 'align': 'center' }, { 'align': 'justify' }, { 'align': 'right' }]
        		// ],
        		editorMode: [{'json': "ace/mode/json"}, {'html': "ace/mode/html"}]
			}
		},
		mounted () {
    	},
		methods: {
			handlePreview (id) {
				const config = vacForm[id]
				this.configData = config // 将配置信息传递到 GenerateForm 中
				this.previewVisible = true			
			},
			handleClose (done) {
				this.previewVisible = false
			},
			handleGenerateJson (id) {
				const strForm = vacForm[id]
    			const formatForm = JSON.stringify(strForm, null, '\t')
    			this.jsonTemplate = formatForm
     			this.jsonVisible = true
      		},
			handleGenerateHtml (id) {
				const strForm = vacForm[id]
    			const formatForm = JSON.stringify(strForm, null, '\t')
    			this.htmlTemplate = formatForm
     			this.htmlVisible = true
      		},
		}
	}

</script>

<style>
	.table_container{
		padding: 20px;
	}
</style>
