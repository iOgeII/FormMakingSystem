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
								<li 
									v-if="basicFields.indexOf(item.type)>=0" 
									class="form-edit-widget-label" 
									:class="{'no-put': item.type == 'divider'}" 
									v-for="(item, index) in basicComponents" 
									:key="index"
								>
									<a>
										<i class="icon iconfont" :class="item.icon"></i>
										<span>{{ item.name }}</span>
									</a>
								</li>
							</draggable>
						</template>
						<template>
							<div class="widget-cate">高级组件</div>
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
				<el-aside width="300px" class="fm-right">
					配置
				</el-aside>
				
				

			</el-container>
		</el-main>
	</el-container>
</template>


<script>
import Draggable from 'vuedraggable'
import WidgetForm from '@/components/WidgetForm'
import GenerateForm from '@/components/GenerateForm'
import CusDialog from '@/components/CusDialog'
import {basicComponents, advanceComponents, layoutComponents} from '@/components/componentsConfig.js'

export default {
	name: 'dp-making-form',
	components: {
		Draggable,
		WidgetForm,
		GenerateForm,
		CusDialog
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
      widgetFormSelect: null,
		}
	},
	methods: {
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
		},
		PreviewAll () {

		},
		GenerateCode () {

		}
	}
}
</script>

<style lang="scss">
.widget-empty{
  background-position: 50%;
}

</style>

