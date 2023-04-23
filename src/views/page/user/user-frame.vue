<!-- CREATE by WangXinzhao at 2022/11/29 21:02 -->
<template>
    <div class="user-frame">
        <router-view></router-view>
    </div>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue'

// import EthMetamask from "@/views/components/wallet/index.vue";
// import walletConnect from "@/views/components/wallet/indexmodal.vue";
onMounted(() => {
})
</script>
<style lang="scss" scoped>
/** default style ----START---- **/
.user-frame{
    background: url('@/assets/images/page-bg/color-light-s.jpg') no-repeat center top / 100% auto;
    min-height: 100vh;
}
/** default style -----END----- **/
@media only screen and (min-width: 2001px) {
    // xxxl
}
@media only screen and (max-width: 2000px) {
    // xxl
}
@media only screen and (max-width: 1600px) {
    // xl
}
@media only screen and (max-width: 1200px) {
    // lg
}
@media only screen and (max-width: 1024px) {
    // md
    .user-frame{
        background: url('@/assets/images/page-bg/color-light-s.jpg') no-repeat center top / auto 576px;
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .user-frame{
        background: url('@/assets/images/page-bg/color-light-s.jpg') no-repeat center top / auto 400px;
    }
}
</style>
