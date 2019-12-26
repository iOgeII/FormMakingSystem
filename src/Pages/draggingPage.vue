<template>
	<el-container class="dp2-container">
		<el-main class="dp2-main">
			<el-container>
				<!-- 左边 -->
				<el-aside width="150px" class="fm-left">
					<div class="components-list">
						<template>
							<div class="widget-cate">基本组件</div>
							<draggable
								class="basic-list=group"
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
								class="basic-list=group"
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
								<li class="list-group-item"
									v-for="(item, index) in layoutComponents" :key="index" 
								>
									<a>
										<span>{{ item.name }}</span>
									</a>
								</li>
							</draggable>
						</template>
					</div>
				</el-aside>
				<el-container class="center-container" direction="vertical">
					<el-header class="button-bar" style="height: 45px;">
						<slot name="action"></slot>
						<el-button type="text" size="medium" icon="el-icon-delete" @click="ClearAll()">清空</el-button>
						<el-button type="text" size="medium" icon="el-icon-view" @click="PreviewAll()">预览</el-button>
						<el-button type="text" size="medium" icon="el-icon-document" @click="GenerateCode()">生成代码</el-button>
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
					<!-- <el-container>
						<el-header height="45px" >
						<el-row>
  							<el-col :span="12">
								  <el-button round
								  	class="config-tab"
									:class="{active: configTab=='form'}"
									@click="handleConfigSelect('form')"
									:type="formType">表单属性</el-button>
							</el-col>
							<el-col :span="12">
								  <el-button round
								  	class="config-tab"
									:class="{active: configTab=='widget'}"
									@click="handleConfigSelect('widget')"
									:type="widgetType">字段属性</el-button>
							</el-col>
						</el-row>
						</el-header>
						<el-main class="config-content">
							<widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
							<form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
						</el-main>
					</el-container> -->
				</el-aside>
				
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
				
			</el-container>
		</el-main>
	</el-container>
</template>


<script>
import Draggable from 'vuedraggable'
import WidgetForm from '@/components/WidgetForm'
import GenerateForm from '@/components/GenerateForm'
import CusDialog from '@/components/CusDialog'
import FormConfig from '@/components/FormConfig'
import WidgetConfig from '@/components/WidgetConfig'
import {basicComponents, advanceComponents, layoutComponents} from '@/components/componentsConfig.js'

export default {
	name: 'dp-making-form',
	components: {
		Draggable,
		WidgetForm,
		GenerateForm,
		CusDialog,
		FormConfig,
		WidgetConfig
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

	  		previewVisible: false,
			widgetModels: {},
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
			  }
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
		// 预览
		PreviewAll () {
			this.previewVisible = true
		},
		// 生成代码
		GenerateCode () {

		},
		handleDataChange (field, value, data) {
      		console.log(field, value, data)
    	}
	}
}
</script>

<style lang="scss">
.widget-empty{
  background-position: 50%;
}

</style>

