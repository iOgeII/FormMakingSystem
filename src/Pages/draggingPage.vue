<template>
<div>
	<head-top></head-top>
	<el-container class="dp2-container">
		<el-main class="dp2-main">
			<el-container>
				<!-- 左边 -->
				<el-aside width="150px" class="fm-left">
					<div class="components-list">
						<template>
							<div class="widget-cate">基本组件</div>
							<draggable
								class="list_group"
								tag="ul"
								v-model="basicComponents"
								v-bind="{
									animation: 200,
									group: { name: 'people', pull: 'clone', put: false },
									sort: false,
									disabled: false,
									ghostClass: 'ghost'
								}"
							>
								<el-form 
									class="form-edit-widget-label" 
									:class="{'no-put': item.type == 'divider'}" 
									v-for="(item, index) in basicComponents" 
									:key="index"
								>
									<p>
										<i class="icon iconfont" :class="item.icon"></i>
										<span>{{ item.name }}</span>
									</p>
								</el-form>
							</draggable>
						</template>
						<template>
							<div class="widget-cate">布局组件</div>
							<draggable
								class="list_group"
								tag="ul"
								v-model="layoutComponents"
								v-bind="{
									animation: 200,
									group: { name: 'people', pull: 'clone', put: false },
									sort: false,
									disabled: false,
									ghostClass: 'ghost'
								}"
							>
								<el-form class="list-group-item"
									v-for="(item, index) in layoutComponents" :key="index" 
								>
									<p>
										<i class="icon iconfont" :class="item.icon"></i>
										<span>{{ item.name }}</span>
									</p>
								</el-form>
							</draggable>
						</template>
					</div>
				</el-aside>
				<el-container class="center-container" direction="vertical">
					<el-header class="button-bar" style="height: 45px;">
						<slot name="action"></slot>
						<el-button type="text" size="medium" icon="el-icon-delete" @click="ClearAll()">清空</el-button>
						<el-button type="text" size="medium" icon="el-icon-upload2" @click="handleUpload()">导入JSON</el-button>
						<el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview()">预览</el-button>
						<el-button type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson()">生成JSON</el-button>
						<el-button type="text" size="medium" icon="el-icon-document" @click="handleGenerateHtml()">生成HTML</el-button>
					</el-header>
					<el-main>
						<widget-form
							:data = "widgetForm"
							:select.sync="widgetFormSelect"
						></widget-form>
					</el-main>
				</el-container>

				<el-aside width="325px" class="fm-right">
					<el-tabs v-model="activeName">
						<el-tab-pane label="字段配置" name="widget">
							<widget-config :data="widgetFormSelect" v-if="widgetFormSelect"></widget-config>
						</el-tab-pane>
						<el-tab-pane label="表单配置" name="form">
							<form-config :data="widgetForm.config"></form-config>
						</el-tab-pane>
					</el-tabs>
				</el-aside>

				<el-dialog title="导入JSON" :visible.sync="uploadVisible" @on-close="uploadVisible = false" width="900px">
<!-- 				<vue-editor v-model="jsonTemplate" :editorToolbar="customToolbar"></vue-editor> -->
					<el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
					<ace ref="uploadRef" :modePath="editorMode.json" :content="jsonEg"></ace>
					<span slot="footer" class="dialog-footer">
      					<slot name="action">
        					<el-button @click="uploadVisible = false">取消</el-button>
        					<el-button type="primary" @click="importJSON()" >确 定</el-button>
      					</slot>
    				</span>
				</el-dialog>
				
				<cus-dialog
					:visible="previewVisible"
					@on-close="previewVisible = false"
					ref="widgetPreview"
					width="1000px"
					form
				>
					<generate-form 
						insite="true" 
						@on-change="handleDataChange"
						v-if="previewVisible"
						:data="widgetForm"
						:value="widgetModels"
						:remote="remoteFuncs"
						ref="generateForm"
					>
						<template v-slot:blank="scope">
							Width <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
							Height <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
						</template>
					</generate-form>
				</cus-dialog>

				<el-dialog title="生成JSON" :visible.sync="jsonVisible" @on-close="jsonVisible = false" width="900px">
<!-- 				<vue-editor v-model="jsonTemplate" :editorToolbar="customToolbar"></vue-editor> -->
					<ace :modePath="editorMode.json" :content="jsonTemplate"></ace>
				</el-dialog>

				<el-dialog title="生成Html" :visible.sync="htmlVisible" @on-close="htmlVisible = false" width="900px">
<!-- 				<vue-editor v-model="jsonTemplate" :editorToolbar="customToolbar"></vue-editor> -->
					<ace :modePath="editorMode.html" :content="htmlTemplate"></ace>
				</el-dialog>
				
			</el-container>
		</el-main>
	</el-container>
</div>
</template>


<script>
import headTop from '@/components/headTop'
import Draggable from 'vuedraggable'
import WidgetForm from '@/components/WidgetForm'
import GenerateForm from '@/components/GenerateForm'
import CusDialog from '@/components/CusDialog'
import FormConfig from '@/components/FormConfig'
import WidgetConfig from '@/components/WidgetConfig'
import {basicComponents, advanceComponents, layoutComponents} from '@/components/componentsConfig.js'
import generateCode from '@/components/generateCode.js'
import ACE from '@/components/aceCustom'

export default {
	name: 'dp-making-form',
	components: {
		headTop,
		Draggable,
		WidgetForm,
		GenerateForm,
		CusDialog,
		FormConfig,
		WidgetConfig,
		ace: ACE
	},
	props: {
		basicFields: {
		    type: Array,
      	default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'select', 'switch', 'slider', 'text']
   	},
   	advanceFields: {
        type: Array,
      	default: () => ['fileupload', 'imgupload', 'editor', 'cascader']
    },
   	layoutFields: {
    		type: Array,
      	default: () => ['grid']
    }
	},
	data () {
		return {
			basicComponents,
			advanceComponents,
			layoutComponents,
			widgetForm: {
			   list: [],
        		config: {
          			labelWidth: 100,
          			labelPosition: 'right',
          			size: 'small'
        		},
			},
			configTab: 'form',  
			formType: 'primary',
			// 初始状态下为空
      		widgetFormSelect: null,
			activeName: 'widget',

			uploadVisible: false,
			previewVisible: false,
			jsonVisible: false,
      		htmlVisible: false,
			remoteFuncs: {
        		func_test (resolve) {
          			setTimeout(() => {
            			const options = [
              				{id: '1', name: '1111'},
              				{id: '2', name: '2222'},
              				{id: '3', name: '3333'}
            			]
            		resolve(options)
          			}, 2000)
        		},
        		funcGetToken (resolve) {
          			request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            			resolve(res.uptoken)
          			})
        		},
        		upload_callback (response, file, fileList) {
          			console.log('callback', response, file, fileList)
        		}
			  },
			formConfig: {
				labelWidth: '100px',
				labelPosition: 'top',
				size: 'small'
			},
			widgetModels: {},
			blank: '',
			jsonTemplate: '',
			htmlTemplate: '',
			jsonEg: `{
	"list": [
    	{
    		"type": "input",
    		"name": "单行文本",
    		"icon": "icon-input",
    		"options": {
    		"width": "100%",
    		"defaultValue": "",
    		"required": false,
    		"dataType": "string",
    		"pattern": "",
    		"placeholder": "",
    		"remoteFunc": "func_1540908864000_94322"
    	},
    	"key": "1540908864000_94322",
    	"model": "input_1540908864000_94322",
    	"rules": [
    		{
    			"type": "string",
    			"message": "单行文本格式不正确"
    		}
    	]
    	},
    	{
      		"type": "textarea",
      		"name": "多行文本",
      		"icon": "icon-diy-com-textarea",
      		"options": {
        		"width": "100%",
		        "defaultValue": "",
        		"required": false,
        		"pattern": "",
        		"placeholder": "",
        		"remoteFunc": "func_1540908876000_19435"
      		},
      		"key": "1540908876000_19435",
      		"model": "textarea_1540908876000_19435",
      		"rules": []
    	}
  	],
  	"config": {
    	"labelWidth": 100,
    	"labelPosition": "top",
    	"size": "small"
  	}
}`,
			editorMode: [{'json': "ace/mode/json"}, {'html': "ace/mode/html"}]
		}
	},
	methods: {
		handleConfigSelect (value) {
			this.configTab = value
			if (value == 'widget'){
				this.widgetType = 'primary'
				this.formType = '' 
			}else if (value == 'form') {
				this.widgetType = ''
				this.formType = 'primary'
			}
		},
		// 清除
		ClearAll () {
			this.widgetForm = {
				list: [],
				config: {
					labelWidth: 100,
					labelPosition: 'right',
					size: 'small',
					customClass: ''
				}
			}
			
			this.widgetFormSelect = {}
		},
		//导入JSON
		handleUpload(){
			this.uploadVisible = true
		},
		importJSON(){
			const formatForm = JSON.parse(this.$refs.uploadRef.aceEditor.getSession().getValue())
			this.setJSON(formatForm)
			console.log(formatForm)
			this.uploadVisible = false
		},
		// 预览
		handlePreview () {
			this.previewVisible = true
		},
		// 生成JSON
		handleGenerateJson () {
			this.jsonVisible = true
			const formatForm = JSON.parse(JSON.stringify(this.widgetForm))
			this.jsonTemplate = JSON.stringify(formatForm, null, '\t')
			console.log(this.widgetForm)
			console.log(formatForm)
		},
		// 生成HTML
		handleGenerateHtml () {
			this.htmlVisible = true
			const formatForm = JSON.parse(JSON.stringify(this.widgetForm))
			this.htmlTemplate = generateCode(JSON.stringify(formatForm, null, '\t'))
			console.log(formatForm)
		},
		handleDataChange (field, value, data) {
      		console.log(field, value, data)
		},
		setJSON (json) {
			this.widgetForm = json
			if (json.list.length> 0) {
        		this.widgetFormSelect = json.list[0]
      		}
    	},
	}
}
</script>

<style lang="scss">
.widget-empty{
  background-position: 50%;
}

.widget-cate{
	width: 100%;
	overflow:hidden
}

.components-list {
	padding:0%;
    display: block;
	height: 100%;
}

.list_group{
	padding:0%
}

.form-edit-widget-label{
	font-size: 10px;
	width: 47%;
	height: 30px;
	position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    color: #333;
	border: 2px solid #f4f6fc;
}

</style>

