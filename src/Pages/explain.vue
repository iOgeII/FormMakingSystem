<template>
    <div class="explain-container">
        <head-top></head-top>
        <el-form>
            <h3 style="padding-left: 40px">说明</h3>
            <el-card class="box-card">
                <div class="text item">
                    该拖拽式自助表单生成系统用于提供用户便捷快捷式在线表单生成功能，同时生成JSON/HTML代码，供用户其他制定地方使用。
                </div>
                <div class="text item">
                    用户若遇到问题，请先将问题发至指定邮箱974495202@qq.com，技术人员收到问题后将尽快解决您的问题，若一周后问题并未解决，请致电15366199027。
                </div>
                <div class="text item">
                    感谢您的使用！
                </div>
            </el-card>
        </el-form>
    </div>  
</template>

<script>
import headTop from '@/components/headTop'
export default {
    components:{
        headTop
    }
}
</script>>

<style>
.box-card {
    width: 80%;
    margin-left: 40px;
}

.text {
    font-size: 20px;
}
</style>

