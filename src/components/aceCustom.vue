<template>
  <div class="ace-container">
    <!-- 官方文档中使用 id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
    <div class="ace-editor" ref="ace"></div>
  </div>
</template>

<script>
  import ace from 'ace-builds'
  import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入
  // import 'ace-builds/src-noconflict/theme-monokai' // 默认设置的主题
  import 'ace-builds/src-noconflict/snippets/javascript'
  import 'ace-builds/src-noconflict/snippets/html'
  import 'ace-builds/src-noconflict/snippets/css'
  import 'ace-builds/src-noconflict/snippets/scss'
  import 'ace-builds/src-noconflict/snippets/json'

 
  export default {
    props: ['modePath', 'content'],
    mounted () {
      this.aceEditor = ace.edit(this.$refs.ace, {
        maxLines: 25, // 最大行数，超过会自动出现滚动条
        minLines: 20, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 14, // 编辑器内字体大小
//        theme: this.themePath, // 默认设置的主题
//        mode: this.modePath, // 默认设置的语言模式
        tabSize: 4 // 制表符设置为 4 个空格大小
      })
      this.aceEditor.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true
      })
      this.aceEditor.getSession().setMode(this.modelPath)
      this.aceEditor.getSession().setValue(this.content)
    },
    data () {
      return {
        aceEditor: null
      }
    },
    computed: {
      //监听父组件的数值变化
      contentHistory() {
        return this.content;
      }
    },
    watch: {
      contentHistory(newValue, oldValue) {
        this.content = newValue;
        this.aceEditor.getSession().setValue(this.content)
      }
    },
  }
</script>
