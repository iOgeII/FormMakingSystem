<template>
	<div class="fillcontain">
		<head-top></head-top>
		<div class="table_container">
			<el-table :data="tableData" highlight-current-row style="width: 100%" >
				<el-table-column property="form_name" label="表名" width="500"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-view" size="small" @click="handlePreview(scope.$index)">预览</el-button>
						<el-button type="primary" icon="el-icon-tickets" size="small" @click="handleGenerateJson(scope.$index)">生成JSON</el-button>
						<el-button type="primary" icon="el-icon-tickets" size="small" @click="handleGenerateHtml(scope.$index)">生成代码</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- <el-button @click="test">后端测试</el-button> -->
		</div>
		<el-dialog title="预览" v-if="previewVisible" :visible.sync="previewVisible" @on-close="previewVisible = false" width="900px" form>
			<exist-form :visible.sync="previewVisible" :data = "configData" :remote="remoteFuncs" insite="true" ref="existForm"></exist-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="previewVisible = false">取 消</el-button>
				<el-button type="primary" @click="previewVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="生成JSON" :visible.sync="jsonVisible" @on-close="jsonVisible = false" width="900px">
			<ace :modePath="editorMode.json" :content="jsonTemplate"></ace>
		</el-dialog>

		<el-dialog title="生成Html" :visible.sync="htmlVisible" @on-close="htmlVisible = false" width="900px">
			<ace :modePath="editorMode.html" :content="htmlTemplate"></ace>
		</el-dialog>
	</div>
</template>

<script>
	import headTop from '@/components/headTop'
	import existForm from '@/components/ExistForm'
	import { vacForm } from '@/components/testForm.js'
	import generateCode from '@/components/generateCode.js'
	import ACE from '@/components/aceCustom'

	export default {
		components: {
			headTop,
			existForm,
			ace: ACE
		},
		data(){
			return {
				tableData: [{
					form_name: '休假申请表',
                }, 
				],
				previewVisible: false,
				jsonVisible:false,
				htmlVisible:false,
				configData: {},
				remoteFuncs: {},
				jsonTemplate: '',
				htmlTemplate: '',
        		editorMode: [{'json': "ace/mode/json"}, {'html': "ace/mode/html"}]
			}
		},
		mounted () {
    	},
		methods: {
			handlePreview (id) {
				this.$message('加载中 请稍候');
				this.previewVisible = false
				let data = {params : {filename: 'vacForm.json'}}
				this.$http.get('/api/form/fetchJson',data).then((response) => {
					const vacaForm = response.body[id]; // 获取到数据
					this.configData = vacaForm;
				})
				setTimeout(()=>this.previewVisible = true,1000)			
			},
			handleGenerateJson (id) {
				this.jsonVisible = false
				let data = {params : {filename: 'vacForm.json'}}
				this.$http.get('/api/form/fetchJson',data).then((response) => {
					const strForm = response.body[id]; // 获取到数据
					const formatForm = JSON.stringify(strForm, null, '\t')
					this.jsonTemplate = formatForm
				})
     			this.jsonVisible = true
      		},
			handleGenerateHtml (id) {
				this.htmlVisible = false
				let data = {params : {filename: 'vacForm.json'}}
				this.$http.get('/api/form/fetchJson',data).then((response) => {
					const strForm = response.body[id]; // 获取到数据
					const formatForm = JSON.stringify(strForm, null, '\t')
					this.htmlTemplate = generateCode(formatForm)
				})
				this.htmlVisible = true
			},
			test(){
				let data = {params : {filename: 'vacForm.json'}}
				console.log(data.params.filename);
				this.$http.get('/api/form/fetchJson',{params: {filename: 'vacForm.json'}}).then((response) => {
					response = response.body; // 获取到数据
					console.log(response);
				})
			}
		}
	}

</script>

<style>
	.table_container{
		padding: 20px;
	}
</style>
