<template>
	<div class="widget-form-container">
		<div v-if="data.list.length == 0" class="form-empty">从左侧拖拽添加组件</div>
		<el-form :size="data.config.size" label-suffix=":" :label-position="data.config.label-position" :label-width="data.config.label-width + 'px'">
     
     <draggable class=""
      v-model="data.list"
      v-bind="{
        group:'people',
        ghostClass: 'ghost',
        animation: 200,
        disabled: false,
      }"
      @end="handleMoveEnd"
      @add="handleWidgetAdd"
     >
      <!-- <li class="list-group-item"
        v-for="(element, index) in data.list"
      >
        {{ element.name }}
      </li> -->
      <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
        <el-form-item
          class="list-form-item"
          v-for="(element, index) in data.list"
          :label="element.name"
        >
          <template v-if="element.type == 'input'">
            <el-input 
              v-model="element.options.defaultValue"
              :style="{width: element.options.width}"
              :placeholder="element.options.placeholder"
              :disabled="element.options.disabled"
            ></el-input>
          </template>

          <template v-if="element.type == 'textarea'">
            <el-input type="textarea" :rows="5"
              v-model="element.options.defaultValue"
              :style="{width: element.options.width}"
              :disabled="element.options.disabled"
              :placeholder="element.options.placeholder"
            ></el-input>
          </template>

          <template v-if="element.type == 'number'">
            <el-input-number 
              v-model="element.options.defaultValue" 
              :disabled="element.options.disabled"
              :controls-position="element.options.controlsPosition"
              :style="{width: element.options.width}"
            ></el-input-number>
          </template>

          <template v-if="element.type == 'radio'">
            <el-radio-group v-model="element.options.defaultValue"
              :style="{width: element.options.width}"
              :disabled="element.options.disabled"
            >
              <el-radio  
                :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
              
              >
                {{element.options.showLabel ? item.label : item.value}}
              </el-radio>
            </el-radio-group>
          </template>

          <template v-if="element.type == 'checkbox'">
            <el-checkbox-group v-model="element.options.defaultValue"
              :style="{width: element.options.width}"
              :disabled="element.options.disabled"
            >
              <el-checkbox
                :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
              >
                {{element.options.showLabel ? item.label : item.value}}
              </el-checkbox>
            </el-checkbox-group>
          </template>

          <template v-if="element.type == 'time'">
            <el-time-picker 
              v-model="element.options.defaultValue"
              :is-range="element.options.isRange"
              :placeholder="element.options.placeholder"
              :start-placeholder="element.options.startPlaceholder"
              :end-placeholder="element.options.endPlaceholder"
              :readonly="element.options.readonly"
              :disabled="element.options.disabled"
              :editable="element.options.editable"
              :clearable="element.options.clearable"
              :arrowControl="element.options.arrowControl"
              :style="{width: element.options.width}"
            >
            </el-time-picker>
          </template>        

          <template v-if="element.type == 'date'">
            <el-date-picker
              v-model="element.options.defaultValue"
              :type="element.options.type"
              :is-range="element.options.isRange"
              :placeholder="element.options.placeholder"
              :start-placeholder="element.options.startPlaceholder"
              :end-placeholder="element.options.endPlaceholder"
              :readonly="element.options.readonly"
              :disabled="element.options.disabled"
              :editable="element.options.editable"
              :clearable="element.options.clearable"
              :style="{width: element.options.width}"  
            >
            </el-date-picker>
          </template> 

          <template v-if="element.type == 'select'">
            <el-select
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :multiple="element.options.multiple"
              :clearable="element.options.clearable"
              :placeholder="element.options.placeholder"
              :style="{width: element.options.width}"
            >
              <el-option v-for="item in element.options.options" :key="item.value" :value="item.value" :label="element.options.showLabel?item.label:item.value"></el-option>
            </el-select>
          </template> 

          <template v-if="element.type=='switch'">
            <el-switch
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
            >
            </el-switch>
          </template>

          <template v-if="element.type=='slider'">
            <el-slider 
              v-model="element.options.defaultValue"
              :min="element.options.min"
              :max="element.options.max"
              :disabled="element.options.disabled"
              :step="element.options.step"
              :show-input="element.options.showInput"
              :range="element.options.range"
              :style="{width: element.options.width}"
            ></el-slider>
          </template>          

          <template v-if="element.type == 'text'">
            <span>{{element.options.defaultValue}}</span>
          </template>

        </el-form-item>
        <!-- <el-form-item
          class="list-form-item"
          v-for="(element, index) in data.list"
          :label="element.name"
        >
          <template v-if="element.type != 'grid'">
            <template v-if="element.type == 'input'">
              <el-input 
                v-model="element.options.defaultValue"
                :style="{width: element.options.width}"
                :placeholder="element.options.placeholder"
                :disabled="element.options.disabled"
              ></el-input>
            </template>
          </template>
        </el-form-item> -->
        <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
       <!--  <el-form-item
          class="list-form-item"
          v-for="(element, index) in data.list"
          :label="element.name"
        > -->
        <!-- </el-form-item> -->
        <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
        <!-- <template v-for="(element, index) in data.list">
          <template v-if="element.type != 'grid'">
            <template v-if="element.type == 'input'">
              <el-input
                :style="{width: element.options.width}"
                :placeholder="element.options.placeholder"
                v-model="element.options.defaultValue"
              ></el-input>
            </template> -->
           <!--  <widget-form-item
              :data="data"
              :element="element"
              :index="index"
            ></widget-form-item> -->
            <!-- <widget-form-item
              v-if="element && element.key"
              :key="element.key"
              :element="element"
              :select.sync="selectWidget"
              :index="index"
              :data="data"
            ></widget-form-item> -->
          <!-- </template>
        </template>
 -->
        <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
        <!-- <template>
          <widget-form-item 
            v-if="element && element.key"
            :key="element.key"
            :element="element"
            :select.sync="selectWidget"
            :index="index"
            :data="data"
          ></widget-form-item>
        </template> -->
        <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
       <!-- <transition-group name="fade" tag="div" class="widget-form-list">
        <template v-for="(element, index) in data.list">
          <template>
            <widget-form-item
              v-if="element && element.key"
              :key="element.key"
              :element="element"
              :select.sync="selectWidget"
              :index="index"
              :data="data"
            ></widget-form-item>
          </template>
        </template>
       </transition-group>
     </draggable> -->
     <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<!-- 			<draggable class=""
				v-model="data.list" 
        		v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        		@end="handleMoveEnd"
        		@add="handleWidgetAdd"
      		>
          transition-group 多个元素组件过度效果
      			<transition-group name="fade" tag="div" class="widget-form-list">
      				<template v-for="(element, index) in data.list">
                <el-row class="widget-col widget-view" v-if="element && element.key" :key="element.key"
                  type="flex"
                  :class="{active: selectWidget.key == element.key}"
                  :gutter="element.options.gutter ? element.options.gutter : 0"
                  :justify="element.options.justify"
                  :align="element.options.align"
                  @click.native="handleSelectWidget(index)">
                  <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                    <draggable
                        v-model="col.list"
                        :no-transition-on-drag="true"
                        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                        @end="handleMoveEnd"
                        @add="handleWidgetColAdd($event, element, colIndex)"
                      >
                        <transition-group name="fade" tag="div" class="widget-col-list">
                          <widget-form-item 
                            v-for="(el, i) in col.list"
                            :key="el.key"
                            v-if="el.key"
                            :element="el" 
                            :select.sync="selectWidget" 
                            :index="i" 
                            :data="col">
                          </widget-form-item>
                        </transition-group>
                        
                      </draggable>
                  </el-col>
                  
                </el-row>
      				</template>
      			</transition-group> -->
      		</draggable>
		</el-form>
	</div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'

export default {
  components: {
    Draggable,
    WidgetFormItem
  },

  props: ['data', 'select'],
  data () {
    return {
      selectWidget: this.select
    }
  },
  mounted () {
    document.body.ondrop = function (event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  method: {
    handleMoveEnd ({newIndex, oldIndex}) {
      console.log('index', newIndex, oldIndex)
    },
    handleSelectWidget (index) {
      console.log(index, '#####')
      this.selectWidget = this.data.list[index]
    },
    handleWidgetAdd (evt) {
      console.log('add', evt)
      console.log('end', evt)
      const newIndex = evt.newIndex
      const to = evt.to
      console.log(to)
      
      //为拖拽到容器的元素添加唯一 key
      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: this.data.list[newIndex].type + '_' + key,
        rules: []
      })

      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({...item}))
        })
      }

      this.selectWidget = this.data.list[newIndex]
    }
    // onAdd (evt) {
    //   const newIndex = evt.newIndex
    //   const key = (new Date()).getTime()
    //   this.$set(this.widgetList, newIndex, {
    //     ...this.widgetList[newIndex],
    //     options: {
    //       ...this.widgetList[newIndex].options
    //     },
    //     key
    //   })
    // },
  }
}

// export default {
//     components: {
//       Draggable,
//     },
//     props: ['data', 'select'],
//     data () {
//       return {
//         selectWidget: this.select
//       }
//     },
//     mounted () {
//       document.body.ondrop = function (event) {
//         let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
//         if (isFirefox) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
//       }
//     },
//     watch: {
//       select (val) {
//         this.selectWidget = val
//       },
//       selectWidget: {
//         handler (val) {
//           this.$emit('update:select', val)
//         },
//         deep: true
//       }
//     },
//     method: {
//       handleMoveEnd ({newIndex, oldIndex}) {
//         console.log('index', newIndex, oldIndex)
//       },
//       handleSelectWidget (index) {
//         console.log(index, '#####')
//         this.selectWidget = this.data.list[index]
//       },
//       handleWidgetAdd (evt) {
//         console.log('add', evt)
//         console.log('end', evt)
//         const newIndex = evt.newIndex
//         const to = evt.to
//         console.log(to)
      
//         //为拖拽到容器的元素添加唯一 key
//         const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
//         this.$set(this.data.list, newIndex, {
//           ...this.data.list[newIndex],
//           options: {
//             ...this.data.list[newIndex].options,
//             remoteFunc: 'func_' + key
//           },
//           key,
//           // 绑定键值
//           model: this.data.list[newIndex].type + '_' + key,
//           rules: []
//         })

//         if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
//           this.$set(this.data.list, newIndex, {
//             ...this.data.list[newIndex],
//             options: {
//               ...this.data.list[newIndex].options,
//               options: this.data.list[newIndex].options.options.map(item => ({
//                 ...item
//               }))
//             }
//           })
//         }

//         if (this.data.list[newIndex].type === 'grid') {
//           this.$set(this.data.list, newIndex, {
//             ...this.data.list[newIndex],
//             columns: this.data.list[newIndex].columns.map(item => ({...item}))
//           })
//         }

//         this.selectWidget = this.data.list[newIndex]
//       },
//       handleWidgetColAdd ($event, row, colIndex) {
//       console.log('coladd', $event, row, colIndex)
//       const newIndex = $event.newIndex
//       const oldIndex = $event.oldIndex
//       const item = $event.item

//       // 防止布局元素的嵌套拖拽
//       if (item.className.indexOf('data-grid') >= 0) {

//         // 如果是列表中拖拽的元素需要还原到原来位置
//         item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])

//         row.columns[colIndex].list.splice(newIndex, 1)

//         return false
//       }

//       console.log('from', item)

//       const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

//       this.$set(row.columns[colIndex].list, newIndex, {
//         ...row.columns[colIndex].list[newIndex],
//         options: {
//           ...row.columns[colIndex].list[newIndex].options,
//           remoteFunc: 'func_' + key
//         },
//         key,
//         // 绑定键值
//         model: row.columns[colIndex].list[newIndex].type + '_' + key,
//         rules: []
//       })

//       if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox' || row.columns[colIndex].list[newIndex].type === 'select') {
//         this.$set(row.columns[colIndex].list, newIndex, {
//           ...row.columns[colIndex].list[newIndex],
//           options: {
//             ...row.columns[colIndex].list[newIndex].options,
//             options: row.columns[colIndex].list[newIndex].options.options.map(item => ({
//               ...item
//             }))
//           }
//         })
//       }

//       this.selectWidget = row.columns[colIndex].list[newIndex]
//     },
//     }
//   }

</script>