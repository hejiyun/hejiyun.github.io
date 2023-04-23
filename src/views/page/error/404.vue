<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="page-404">
        <h3>404 not found</h3>
        <p>Path: {{path}}</p>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const path = ref(router.currentRoute.value.fullPath)
onMounted(()=>{
})
</script>

<style lang="scss" scoped>
.page-404{
    font-size: 75px;
    margin:0;
    padding:1em 0;
    h3{
        font-size: .4rem;
    }
    p{
        font-size: .32rem;
    }
}
</style>
