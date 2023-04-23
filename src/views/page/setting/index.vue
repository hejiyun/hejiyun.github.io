<!-- CREATE by Hejiyun at 2022/8/10 15:15 -->
<template>
    <div class="setting-index">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "settingFrame",
    components: {
    },
    data() {
        return {
            blockRender: false,
        }
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.blockRender = true
            }, 100)
        })
    },
    methods: {},
}
</script>

<style lang="scss">
.setting-index {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 10px 16px;
}
</style>