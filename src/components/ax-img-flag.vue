<script setup>
import { ref, onMounted} from 'vue'
const props = defineProps({
    emoji:false,
});
onMounted(()=>{

})
</script>
<template>
    <span class="ax-img-flag"><span><b v-if="props.emoji">{{props.emoji}}</b><i><slot></slot></i></span></span>
</template>
<style lang="scss" scoped>
.ax-img-flag{
    position: relative;
    line-height: 36px;
    >span{
        background: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        color: #FFF;
        border-radius: 20px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        z-index: 10;
        >b{
            background: rgba(0, 0, 0, 0.75);
            font-size: 24px;
            border-radius: 20px 0;
            white-space: nowrap;
        }
        >i{
            font-size: 20px;
            text-transform: uppercase;
            font-weight: 700;
            white-space: nowrap;
        }
        :nth-child(1){
            padding:0 16px;
        }
        :nth-child(2){
            padding:0 16px 0 8px;
        }
    }
}
</style>
