<template>
    <div v-show="selectWidget.key == element.key"> in WidgetConfig</div>
</template>

<script>
export default {
    props: ['element', 'select', 'data'],
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

