<template>
	<el-container class="dp2-container">
		<el-main class="dp2-mian">
			<el-container>
        <!-- 左边的aside -->
				<el-aside width="200px" class='fm-left'>
					<div class="components-list">
<!-- 						<template v-if="basicFields.length"> -->
						<template>
							<div class="widget-cate">基本组件</div>
                <draggable
                  class="basic-list-group"
                  tag="ul"
                  v-model="basicComponents"
                  v-bind="{
                    animation: 200,
                    group:{ name: 'people', pull: 'clone', put: false },
                    sort: false,
                    disabled: false,
                    ghostClass: 'ghost'
                  }"
                >
                  <li class="list-group-item"
                    v-for="(item, index) in basicComponents" :key="index"
                  >
                    <a>
                      <i class="icon iconfont" :class="item.icon"></i>
                      <i :class="item.icon"></i>
                      <span>{{ item.name }}</span>
                    </a>
                  </li> 
                </draggable>
<!-- 							<draggable tag='ul' :list="basicComponents"
								v-bind="{group:{name:'people', pull:'clone', put:false}, sort:false, ghostClass:'ghost'}"
								@end="handleMoveEnd"
								@start="handleMoveStart"
								:move="handleMove"
							> -->
							<!-- <draggable tag='ul' :list="basicComponents" style="list-style-type:none; margin:0; padding:0; overflow: hidden;"
								v-bind="{group:{name:'people', pull:'clone', put:false}, sort:false, ghostClass:'ghost'}"
                :move="handleMove"
							>
								<li v-if="basicFields.indexOf(item.type)>=0" class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in basicComponents" :key="index">
                  					<a>
                    					<i class="icon iconfont" :class="item.icon"></i> -->
<!-- 										<i :class="item.icon"></i> -->
										<!-- <span>{{item.name}}</span>
                  					</a>
               					</li>

              				</draggable> -->
						</template>

<!-- 						<template v-if="advanceFields.length"> -->
						<template>
						    <div class="widget-cate">高级组件</div>
<!-- 						    <draggable tag="ul" :list="advanceComponents" 
						    v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
						    @end="handleMoveEnd"
						    @start="handleMoveStart"	
						    :move="handleMove"
						    > -->
						    <!-- <draggable tag='ul' :list="advanceComponents" style="list-style-type:none; margin:0; padding:0; overflow: hidden;"
								v-bind="{group:{name:'people', pull:'clone', put:false}, sort:false, ghostClass:'ghost'}"
							>
                				<li v-if="advanceFields.indexOf(item.type) >= 0" class="form-edit-widget-label" :class="{'no-put': item.type == 'table'}" v-for="(item, index) in advanceComponents" :key="index">
                					<a>
                						<i class="icon iconfont" :class="item.icon"></i>
                						<span>{{item.name}}</span>
                					</a>
				                </li>
              				</draggable> -->
            			</template>

            			<template>
            				<div class="widget-cate">布局组件</div>
            				<!-- <draggable tag='ul' :list="layoutComponents" style="list-style-type:none; margin:0; padding:0; overflow: hidden;"
            					v-bind="{group:{name:'people', pull:'clone', put:false}, sort:false, ghostClass:'ghost'}"
            				>
            					<li v-if="layoutFields.indexOf(item.type) >=0" class="form-edit-widget-label no-put" v-for="(item, index) in layoutComponents" :key="index">
            						<a>
            							<i class="icon iconfont" :class="item.icon"></i>
            							<span>{{item.name}}</span>
            						</a>
            					</li>
            				</draggable> -->
            			</template>
					</div>
				</el-aside>
        <!-- 中间main -->
				<el-container class="center-container" direction="vertical">
					<el-header class="button-bar" style="height: 45px;">
            			<slot name="action"></slot>
<!--             			<el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" >导入JSON</el-button>
            			<el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" >清空</el-button>
            			<el-button v-if="preview" type="text" size="medium" icon="el-icon-view" >预览</el-button>
            			<el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" >生成JSON</el-button>
            			<el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document">生成代码</el-button>
 -->         			
                  <el-button type="text" size="medium" icon="el-icon-delete" >清空</el-button>
            			<el-button type="text" size="medium" icon="el-icon-view" >预览</el-button>
<!--             			<el-button type="text" size="medium" icon="el-icon-tickets" >生成JSON</el-button> -->
            			<el-button type="text" size="medium" icon="el-icon-document">生成代码</el-button>

 					</el-header>
         			<el-main :class="{'widget-empty': widgetForm.list.length == 0}">
         				<widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
          			</el-main>
        </el-container>
            <el-aside width='300px' class='fm-right'>
            配置
            </el-aside>

			</el-container>
		</el-main>
	</el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetForm from '@/components/WidgetForm'
import {basicComponents, advanceComponents, layoutComponents} from '@/components/componentsConfig.js'

export default {
	name: 'dp-making-form',
	components: {
		Draggable,
		WidgetForm
	},
	props:{
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
  method: {
    handleMove () {
      return true
    }
  }
}

</script>

<style>

.list-form-item{
  border: 1px dashed blue;
  padding: 5px;

  &.el-form-item{
    margin: 1px;
  }
}

.widget-empty{
	background-position: 100%;
}
.widget-cate{
  line-height: 32px;
	overflow:hidden
}

.components-list .form-edit-widget-label {
    font-size: 14px;
    display: block;
    width: 45%;
    line-height: 28px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
    margin: 1%;
    color: #333;
    border: 1px solid #f4f6fc;
}
.fm-left {
    border-right: 1px solid #ccc;
  }
.fm-right {
    border-left: 1px solid #ccc;
  }

</style>
