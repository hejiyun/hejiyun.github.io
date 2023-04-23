<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="toast" :class="active" @click.stop @mousewheel.stop.prevent>
        {{text}}
    </div>
</template>
<script setup>
import {ref, nextTick} from 'vue'
import {useI18n} from "vue-i18n"
const {locale} = useI18n();
const active = ref('hide');
const text = ref('');
const timedelay = ref(0);

const show = (content)=>{
    if(!content){return false;}
    timedelay.value && clearTimeout(timedelay.value)
    active.value = '';
    nextTick(()=>{
        timedelay.value = setTimeout(()=>{
            text.value = content
            active.value = 'show';
            nextTick(()=>{
                timedelay.value = setTimeout(()=>{
                    active.value = 'hide';
                    nextTick(()=>{
                        timedelay.value = setTimeout(()=>{
                            text.value = ''
                            timedelay.value = 0
                        },500)
                    })
                },3500)
            })
        },50)
    })
}
window.toast = show;
defineExpose({show})

</script>
<style lang="scss" scoped>
.toast{
    font-family: Gilroy,'Microsoft YaHei',"WenQuanYi Micro Hei",'PingFang TC','PingFang HK', sans-serif;
    position: fixed;
    top:100%;
    left:100%;
    height: 0;
    transform: translate(-50%, calc(-50% + 1em));
    overflow: hidden;
    background: rgba(0,0,0,.8);
    max-width: 30vw;
    font-size: 14px;
    color: #FFF;
    box-sizing: border-box;
    z-index: 99999;
    padding:0;
    border-radius: .5em;
    opacity: 0;
    &.show{
        top:50%;
        left:50%;
        height: initial;
        padding:1em;
        transform: translate(-50%,-50%);
        opacity: 1;
        transition: opacity .5s cubic-bezier(.45,.7,.6,1), transform .5s cubic-bezier(.45,.7,.6,1);
    }
    &.hide{
        top:50%;
        left:50%;
        height: initial;
        padding:0;
        transform: translate(-50%, calc(-50% + 1em));
        opacity: 0;
        transition: opacity .5s cubic-bezier(.4,0,.55,3), transform .5s cubic-bezier(.4,0,.55,3),padding 0s .5s;
    }
}


@function rem($pxNum){
    @return calc($pxNum / 37.5) * 1rem;
}
@media screen and (max-width:768px) {
    .toast {
        max-width: 100vw;
    }
}
</style>
