<script setup>
import { ref,onMounted} from 'vue'

onMounted(()=>{

})
</script>
<template>
    <span class="tag"><slot></slot></span>
</template>
<style lang="scss" scoped>
.tag{
    color: rgba(0, 0, 0, 0.25);
    display: block;
    background: rgba(244, 244, 244, 0.9);
    border-radius: 20px;
    font-size: .714286em;
    line-height: 160%;
    white-space: nowrap;
    font-weight: 800;
    padding:0 .7em;
    flex-shrink: 0;
    flex-grow: 0;
}
</style>