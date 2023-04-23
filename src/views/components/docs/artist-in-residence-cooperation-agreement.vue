<!-- CREATE by WangXinzhao at 2022/9/16 00:27 -->
<template>
    <div class="modal-wrap" :class="{active:active}" @click.stop @mousewheel.stop.prevent>
        <div class="modal-box"  @click.stop @mousewheel.stop.prevent>
            <i class="modal-close">
                <ax-icon :class="isMobile?'icon-arrow-left':'icon-times'" @click.stop="hide()"></ax-icon>
            </i>
            <div class="modal-header">
                <h2>{{$t('docs.agreement')}}</h2>
            </div>
            <div class="modal-content">
                <div class="type-box scroll-box" ref="scrollBox" @mousewheel.stop>
                    <zh-tw v-if="/^zh/.test(locale)"></zh-tw>
                    <en-us v-else></en-us>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue'
const {locale} = useI18n();
import AxIcon from "@/components/ax-dom/ax-icon.vue";
import {useI18n} from "vue-i18n";
import ZhTw from "@/views/components/docs/zh-tw.vue";
import EnUs from "@/views/components/docs/en-us.vue";

const active=ref(false);
const scrollBox=ref()
const show = (formData)=>{
    active.value=true;
    scrollBox.value.scrollTop = 0
}
const hide = ()=>{
    active.value=false;
}
defineExpose({show,hide})

const isMobile = ref(false);
const resetHeight = ()=>{
    isMobile.value = (~~window.innerWidth)<=768
}
resetHeight();
window.addEventListener('resize',resetHeight)
</script>
<style lang="scss" scoped>

.modal-wrap{
    position: fixed;
    left:0;
    top:0;
    overflow: hidden;
    width: 0;
    height: 0;
    z-index: 20000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 300ms,width 0s 300ms,height 0s 300ms;
    .modal-box{
        flex-shrink: 0;
        flex-grow: 0;
        width: 800px;
        height: 80%;
        background: #FFF;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        z-index: 5002;
        transform: translateY(40px);
        transition: transform 300ms;
    }
    .modal-close{
        font-size: 24px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: block;
        padding:8px;
        border-radius: 20px;
        position: absolute;
        top:33px;
        right:22px;
        &:hover{
            background: rgba(244, 244, 244, 0.9);
        }
    }
    .modal-header{
        padding:40px 0;
        h2{
            font-size: 26px;
            text-align: center;
            font-weight: 800;
            line-height: 120%;
            color: rgba(0, 0, 0, 0.75);
        }
    }
    .modal-content{
        height: calc(100% - 141.2px);
        overflow: hidden;
        transition: height 300ms 300ms;
    }
    &.active{
        opacity: 1;
        width: 100vw;
        height: 100vh;
        transition: opacity 300ms,width 0s,height 0s;
        .modal-box{
            transform: translateY(0);
        }
    }
}
.scroll-box{
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
}
:deep(article){
    font-size: 13px;
    line-height: 140%;
    padding:0 30px;
    color: rgba(0,0,0,.75);
    *{
        font-size: inherit;
        line-height: inherit;
    }
    >*{
        padding:12px 0;
    }
    &:nth-child(1){
        padding-top: 0;
    }
    h3{
        padding:12px 0 8px;
        font-weight: 800;
    }
    h3 + *{
        padding-top: 0;
    }
    li{
        padding:6px 0;
        &:first-child{
            padding-top:0;
        }
    }
    .table-wrap{
        .table{
            padding:0;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid rgba(219, 219, 219, 0.5);
            table{
                border-spacing: 0;
                border-collapse: collapse;
                empty-cells: hide;
                width: 100%;
                th,td{
                    vertical-align: top;
                    padding:0;
                }
                tbody{
                    >tr{
                        >td{
                            border-right: 1px solid rgba(219, 219, 219, 0.5);
                            border-bottom: 1px solid rgba(219, 219, 219, 0.5);
                            >div{
                                padding:14px 20px;
                            }
                            &:last-child{
                                border-right: 0;
                            }
                        }
                        &:last-child{
                            >td{
                                border-bottom: 0;
                            }
                        }
                    }
                }
                th{
                    width: 50%;
                    position: relative;
                    height: 34.4px;
                    >div{
                        position: absolute;
                        left:-1px;
                        top:-1px;
                        width: calc(100% + 2px);
                        height: 34.4px;
                        padding:10px;
                        text-align: center;
                        font-weight: 800;
                        font-size: 12px;
                        line-height: 140%;
                        color: rgba(0, 0, 0, 0.75);
                        background: rgba(244, 244, 244, 0.5);
                        border-width: 0 0 1px 1px;
                        border-style: solid;
                        border-color: rgba(219, 219, 219, 0.5);
                    }
                    &:first-child{
                        >div{
                            border-bottom-left-radius: 10px;
                        }
                    }
                    &:last-child{
                        >div{
                            border-right-width: 1px;
                            border-bottom-right-radius: 10px;
                        }
                    }

                }
            }
        }
    }
}

@function rem($pxNum){
    @return calc($pxNum / 37.5) * 1px;
}
/** default style ----START---- **/

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
}
@media only screen and (max-width: 768px) {
    // sm

    .modal-wrap{
        .modal-box{
            width: 100%;
            height: 100vh;
            background: #FFF;
            border-radius: 0;
            transform: translateX(10px);
            padding-top: constant(safe-area-inset-top);/* iOS < 11.2 */
            padding-top: env(safe-area-inset-top);/* iOS >= 11.2 */
            padding-bottom: constant(safe-area-inset-bottom);/* iOS < 11.2 */
            padding-bottom: env(safe-area-inset-bottom);/* iOS >= 11.2 */
        }
        .modal-close{
            font-size: 24px;
            width: 44px;
            height: 44px;
            padding:10px;
            border-radius: 20px;
            margin-top: constant(safe-area-inset-top);/* iOS < 11.2 */
            margin-top: env(safe-area-inset-top);/* iOS >= 11.2 */
            top:0;
            left:5px;
            right:initial;
        }
        .modal-header{
            padding:0;
            h2{
                font-size: 16px;
                line-height: 44px;
            }
        }
        .modal-content{
            overflow: hidden;
            transition: none;
            height: calc(100% - 48px);
        }
        &.active{
            opacity: 1;
            width: 100vw;
            height: 100vh;
            transition: opacity 300ms,width 0s,height 0s;
            .modal-box{
                transform: translateX(0);
            }
        }
    }
    :deep(article){
        font-size: 14px;
        line-height: 140%;
        padding:12px 16px;
        color: rgba(0,0,0,.75);
        *{
            font-size: inherit;
            line-height: inherit;
        }
        >*{
            padding:12px 0;
        }
        h3{
            padding:12px 0 8px;
        }
        li{
            padding:6px 0;
        }
        .table-wrap{
            .table{
                padding:0;
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid rgba(219, 219, 219, 0.5);
                table{
                    tbody{
                        >tr{
                            >td{
                                border-right: 1px solid rgba(219, 219, 219, 0.5);
                                border-bottom: 1px solid rgba(219, 219, 219, 0.5);
                                >div{
                                    padding:14px 20px;
                                }
                            }
                        }
                    }
                    th{
                        height: 34.4px;
                        >div{
                            position: absolute;
                            left:-1px;
                            top:-1px;
                            width: calc(100% + 2px);
                            height: 100%;
                            padding:10px;
                            font-size: 12px;
                            border-width: 0 0 1px 1px;
                        }
                        &:first-child{
                            >div{
                                border-bottom-left-radius: 10px;
                            }
                        }
                        &:last-child{
                            >div{
                                border-right-width: 1px;
                                border-bottom-right-radius: 10px;
                            }
                        }
                    }
                }
            }
        }
    }

}
@media only screen and (max-width: 600px) {
    // xs
}
</style>
