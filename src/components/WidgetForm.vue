<template>
	<div class="widget-form-container">
		<div v-if="data.list.length == 0" class="form-empty" style="color:#c9cfd4">从左侧拖拽添加组件</div>
		<el-form 
      :size="data.config.size"
      label-suffix=":"
      :label-position="data.config.labelPosition" 
      :label-width="data.config.labelWidth + 'px'"
    >
      <draggable
        class=""
        v-model="data.list"
        v-bind="{
          group: 'people',
          ghostClass: 'ghost',
          animation: 200,
          disabled: false,
        }"
        @add="onAdd"
        
      >

        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in data.list">
            <template v-if="element.type == 'grid'">
              <el-row 
                class="grid-row" 
                v-if="element && element.key"
                :key="element.key"
                type="flex"
                :class="{active: selectWidget.key == element.key}"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click.native="handleSelectWidget(index)"
              >
                <el-col
                  class="grid-col"
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0"
                >
                  <draggable
                    v-model="col.list"
                    :no-transition-on-drag="true"
                    v-bind="{group:'people', ghostClass:'ghost', animation:200, handle:'.drag-widget'}"
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
                <el-button type="text" class="delete-action" v-on:click="onDelete(index)">删除</el-button>
                
              </el-row>
            </template>

            <template v-else>
              <el-form-item 
                class="list-form-item"
                :key="element.key"
                v-if="element.key"
                :label="element.name"
                @click.native.stop="handleSelectWidget(index)"
                :style="{background: (selectWidget && selectWidget.key == element.key ? '#E8E8E8' : '')}"
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

                <template v-if="element.type == 'rate'">
                  <el-rate v-model="element.options.defaultValue"
                    :max="element.options.max"
                    :disabled="element.options.disabled"
                    :allow-half="element.options.allowHalf"
                  ></el-rate>
                </template>

                <template v-if="element.type == 'text'">
                  <span>{{element.options.defaultValue}}</span>
                </template>

                <el-button type="text" class="delete-action" v-on:click="onDelete(index)">删除</el-button>
              </el-form-item>
            </template>
            
          </template>
        </transition-group>

        <!-- <el-form-item
          class="list-form-item"
          :key="element.key"
          v-for="(element, index) in data.list"
          :label="element.name"
          @click.native.stop="handleSelectWidget(index)"
          :style="{background: (selectWidget && selectWidget.key == element.key ? '#E8E8E8' : '')}"
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

          <template v-if="element.type == 'rate'">
            <el-rate v-model="element.options.defaultValue"
              :max="element.options.max"
              :disabled="element.options.disabled"
              :allow-half="element.options.allowHalf"
            ></el-rate>
          </template>

          <template v-if="element.type == 'text'">
            <span>{{element.options.defaultValue}}</span>
          </template>

          <el-button type="text" class="delete-action" v-on:click="onDelete(index)">删除</el-button>

        </el-form-item> -->
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
      selectWidget: this.select,
    }
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },

    onAdd (evt) {  //handleWidgetAdd (evt)
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
    },
    
    onDelete (index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }
      
      this.data.list.splice(index, 1)
    },
  },
  watch: {
    // 添加对select、selectWidget的监听
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true //为了发现对象内部值的变化
    }
  }
}
</script>

<style lang="scss">
.list-form-item{
  border: 1px dashed blue;
  padding: 5px;

  &.el-form-item{
    margin: 2px;
  }
}

.grid-col{
  border: 1px dashed green;
  padding: 5px;
  height: 60px;

  &.el-form-item{
    margin: 2px;
  }
}

// .grid-row{
//   border: 1px dashed blue;
//   padding: 5px;
//   height: 30px;

//   &.el-form-item{
//     margin: 2px;
//   }
// }

</style>

