<template>
    <div>
        <el-form ref="existForm"
          label-suffix=":"
          :size="data.config.size"
          :model="models" 
          :rules="rules" 
          :label-position="data.config.labelPosition" 
          :label-width="data.config.labelWidth + 'px'"
          v-if='data.list'
          >
            <template v-for="item in data.list">
                <!--如果是栅格布局-->
                <template v-if="item.type == 'grid'">
                    <el-row
                      :key="item.key"
                      type="flex"
                      :gutter="item.options.gutter ? item.options.gutter : 0"
                      :justify="item.options.justify"
                      :align="item.options.align">
                        <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
                            <template v-for="citem in col.list">
                                <!--如果栅格布局中存在空白布局-->
                                <el-form-item v-if="citem.type=='blank'" :label="citem.name" :prop="citem.model" :key="citem.key">
                                    <slot :name="citem.model" :model="models"></slot>
                                </el-form-item>
                                <!--其他普通组件在另一个文件中生成-->
                                <generate-form-item v-else
                                  :key="citem.key"
                                  :models.sync="models"
                                  :remote="remote"
                                  :rules="rules"
                                  :widget="citem">
                                </generate-form-item>
                            </template>
                        </el-col>
                    </el-row>
                </template>

                <!--如果是空白布局-->
                <template v-else-if="item.type =='blank'">
                    <el-form-item :label="item.name" :prop="item.model" :key="item.key">
                        <slot :name="item.model" :model="models"></slot>
                    </el-form-item>
                </template>

                <template v-else>
                    <generate-form-item
                      :key="item.key" z
                      :models.sync="models" 
                      :rules="rules" 
                      :widget="item" 
                      :remote="remote">
                    </generate-form-item>
                </template>

            </template>
        </el-form>
    </div>
</template>

<script>
import GenerateFormItem from '@/components/GenerateFormItem'

export default {
    name: 'exist-form',
    components: {
      GenerateFormItem
    },
    props: ['data', 'remote', 'insite'],
    data () {
        return {
            models: {},
            rules: {}
        }
    },
    created () {
        
    },
    mounted () {
        this.generateModle(this.data.list)
    },
    methods: {
        generateModle (genList) {
            for (let i = 0; i < genList.length; i++) {
                if (genList[i].type === 'grid') {
                    genList[i].columns.forEach(item => { this.generateModle(item.list)})
                } 
                else {
                    if (this.value && Object.keys(this.value).indexOf(genList[i].model) >= 0) {
                        this.models[genList[i].model] = this.value[genList[i].model]
                    } 
                    else {
                        if (genList[i].type === 'blank') {
                            this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
                        } 
                        else {
                            this.models[genList[i].model] = genList[i].options.defaultValue
                        }      
                    }
                    
                    if (this.rules[genList[i].model]) {
                        this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
                            if (item.pattern) {
                                return {...item, pattern: eval(item.pattern)}
                            } 
                            else {
                                return {...item}
                            }
                        })]
                    } 
                    else {
                        this.rules[genList[i].model] = [...genList[i].rules.map(item => {
                            if (item.pattern) {
                                return {...item, pattern: eval(item.pattern)}
                            } 
                            else {
                                return {...item}
                            }
                        })]
                    }      
                }
            }
        },

    },
    computed: {
        //监听父组件的数值变化
        dataListHistory() {
            return this.data.list;
        }
    },
    watch: {
        dataListHistory(newValue, oldValue) {
            this.data.list = newValue;
            this.generateModle(this.data.list);
            console.log(this.data.list)
        }
    },
}
</script>


