<template>
  <el-form-item class="widget-view"
      v-if="element && element.key" 
      :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
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

        <template v-if="element.type == 'rate'">
          <el-rate v-model="element.options.defaultValue"
            :max="element.options.max"
            :disabled="element.options.disabled"
            :allow-half="element.options.allowHalf"
          ></el-rate>
        </template>

        <template v-if="element.type == 'color'">
          <el-color-picker 
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :show-alpha="element.options.showAlpha"
          ></el-color-picker>
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

        <el-button type="text" class="delete-action" v-on:click="handleWidgetDelete(index)">删除</el-button>
    </el-form-item>
</template>

<script>
export default {
  props: ['element', 'select', 'index', 'data'],
  components: {
    
  },
  data () {
    return {
      selectWidget: this.select
    }
  },
  mounted () {
    
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete (index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
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
  }
}
</script>

<style lang="scss">
.widget-view{
  border: 1px dashed blue;
  padding: 5px;

  &.el-form-item{
    margin: 2px;
  }
}

</style>

