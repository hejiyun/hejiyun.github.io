<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="drop-down">
        <div class="drop-list" :class="{active:active}" :style="active && maxHeight ? `height:${maxHeight}`:'' " @mousewheel.stop.prevent>
            <i class="small-screen-close"  @click.stop="hide(false)" @touchmove.stop="hide(false)"></i>
            <div class="drop-scroll" @mousewheel.stop>
                <ul>
                    <li @click="selectItem(item)" :class="{active:item.id === props.selected.id}" v-for="(item) in props.list">
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
        <i class="drop-mask" :class="{active:active}" @click.stop="hide(false)" @touchmove.stop.prevent @mousewheel.stop></i>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import {useI18n} from "vue-i18n"
const {locale} = useI18n();
const active=ref(false)
const props=defineProps({
    maxHeight:String,
    list:Array,
    selected:Object
})
const show = ()=>{
    active.value=true;
}
const hide = ()=>{
    active.value=false;
}
const emit = defineEmits(['select'])

const selectItem = (item)=>{
    emit('select',item);
    hide()
}
defineExpose({show,hide})
onMounted(()=>{

})
</script>
<style lang="scss" scoped>
.drop-down{
    position: relative;
    overflow: visible;
    .drop-list{
        position: absolute;
        z-index: 10000;
        left:0;
        top:0;
        width: 100%;
        background: #FFFFFF;
        box-shadow: 1px 4px 14px rgba(0, 0, 0, .06);
        border-radius: 8px;
        padding:0;
        height: 0;
        opacity: 0;
        //overflow: hidden;
        transform: translateY(2em);
        transition: padding 0s linear 300ms,height 0s linear 300ms,transform 300ms linear,opacity 300ms linear;
        .drop-scroll{
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            ul{
                li{
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 120%;
                    color: #31373D;
                    padding:10px 24px;
                    cursor: pointer;
                    &.active{
                        color: #35C7B8;
                    }
                    &:hover{
                        background: rgba(53, 199, 184, 0.05);
                    }
                }
            }
        }
        &.active{
            opacity: 1;
            padding:20px 0;
            height: 550px;
            transform: translateY(0);
            transition: padding 0s, height 0s, transform 300ms linear,opacity 300ms linear;
        }
    }
    .drop-mask{
        position: fixed;
        z-index: 9999;
        width: 0;
        height: 0;
        left:0;
        top:0;
        &.active{
            width: 100vw;
            height: 100vh;
        }
    }
}

@media screen and (max-width:768px){
    .drop-down{
        position: relative;
        .drop-list{
            position: fixed;
            box-shadow: none;
            border-radius: 14px 14px 0 0;
            transform: translateY(5em);
            top:10%;
            transition: padding 0s linear 300ms,height 0s linear 300ms,transform 300ms linear,opacity 300ms linear;
            .drop-scroll{
                height: 100%;
                overflow-x: hidden;
                overflow-y: scroll;
                ul{
                    padding:0;
                    li{
                        font-weight: 400;
                        font-size: 16px;
                        color: rgba(0, 0, 0, 0.75);
                        padding:20px 16px;
                        position: relative;
                        &.active{
                            color: #35C7B8;
                        }
                        &:hover{
                            background: rgba(53, 199, 184, 0.05);
                        }
                        &::before{
                            position: absolute;
                            top:0;
                            left:16px;
                            width: calc(100% - 32px);
                            content: "";
                            display: block;
                            border-top: 0.5px solid rgba(219, 219, 219, 0.5);
                        }
                    }
                }
            }
            &.active{
                opacity: 1;
                padding:34px 0 0;
                height: 90%;
                transform: translateY(0);
                transition: padding 0s, height 0s, transform 300ms linear,opacity 300ms linear;
            }
            &::before{
                content: "";
                display: block;
                width: 32px;
                height: 6px;
                position: absolute;
                z-index: 1;
                background: #C4C4C4;
                border-radius: 6px;
                left:calc(50% - 16px);
                top:8px;
            }
            .small-screen-close{
                display: block;
                width: 10px;
                height: 34px;
                position: absolute;
                z-index: 2;
                left: 0;
                top: 0;
                border-radius: 14px 14px 0 0;
            }
        }
        .drop-mask{
            position: fixed;
            z-index: 9999;
            width: 100vw;
            height: 0;
            left:0;
            top:0;
            opacity: 0;
            transition: height 0s 300ms,opacity 300ms linear;
            background: rgba(0, 0, 0, 0.4);
            &.active{
                height: 100%;
                opacity: 1;
                transition: height 0s, opacity 300ms linear;
            }
        }
    }
}
</style>
