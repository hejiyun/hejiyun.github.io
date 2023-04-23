<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="modal-wrap" :class="{active:active}" @click.stop @mousewheel.stop.prevent>
        <div class="modal-box"  @click.stop @mousewheel.stop.prevent>
            <i class="modal-close">
                <ax-icon :class="isMobile?'icon-arrow-left':'icon-times'" @click.stop="hide()"></ax-icon>
            </i>
            <div class="modal-header">
                <h2>{{$t(deleteConfrim?'form.deleteConfirm':'form.addWork')}}</h2>
            </div>
            <!--      <div class="modal-content" :style="{height:deleteConfrim?modalHeight.deleteHeight:(state.data.type===3?modalHeight.nftHeight:modalHeight.PhysicalHeight)}">-->
            <div class="modal-content" :style="{height:deleteConfrim?modalHeight.deleteHeight:modalHeight.PhysicalHeight}">
                <div class="type-box delete-work" :class="{show:deleteConfrim===true}">
                    <p>{{$t('form.deleteTips')}}</p>
                    <button type="button" class="btn-cancel" @click="deleteConfrim=false">{{$t('form.cancel')}}</button>
                </div>
                <div class="type-box scroll-box" ref="scrollBox" :class="{show:deleteConfrim===false}" @mousewheel.stop>
                    <div class="form">
                        <div class="work-type-tabs flex">
                            <label @click="toggleType(1)" v-if="false">
                                <i class="check-box" :class="{active:state.data.type===1}"></i><p>{{$t('form.entityWork')}}</p>
                            </label>
                            <label @click="toggleType(2)">
                                <i class="check-box" :class="{active:state.data.type===2}"></i><p>{{$t('form.digitalWork')}}</p>
                            </label>
                            <label @click="toggleType(3)">
                                <i class="check-box" :class="{active:state.data.type===3}"></i><p>{{$t('form.nftWork')}}</p>
                            </label>
                        </div>
                        <!--            <div class="tabs-content" :class="{show:state.data.type===3}">
                                      <dl>
                                        <dt>{{$t('form.contractAddress')}}<i class="required-chart"></i></dt>
                                        <dd>
                                          <input type="text" v-model="state.data.contract_address" @blur="checkSubmit()" :placeholder="$t('form.plsEnter')">
                                        </dd>
                                      </dl>
                                    </div>-->
                        <div class="tabs-content show">
                            <dl v-if="state.data.type===3">
                                <dt>{{$t('form.contractAddress')}}<i class="required-chart"></i></dt>
                                <dd>
                                    <input type="text" v-model="state.data.contract_address" @blur="checkSubmit()" :placeholder="$t('form.plsEnter')">
                                </dd>
                            </dl>
                            <dl>
                                <dt>{{$t('form.workName')}}<i class="required-chart"></i></dt>
                                <dd>
                                    <input type="text" v-model="state.data.name" @blur="checkSubmit()" :placeholder="$t('form.plsEnter') + '('+ $t('form.workNameTips') +')'">
                                </dd>
                            </dl>
                            <dl v-if="state.data.type<3">
                                <dt>{{$t('form.workImages')}}<i class="required-chart"></i></dt>
                                <dd>
                                    <div class="work-pic-list flex">
                                        <template v-for="(v,i) in state.data.images" :key="i">
                                            <i :style="{backgroundImage:`url(${v.base64 || v.url})`}"
                                               :class="v.status"
                                               v-if="v.status && v.status !== 'deleted'">
                                                <span class="retry" :class="{show:v.status==='error'}" @click.stop="upFile2S3(i)">{{$t('form.upRetry')}}</span>
                                                <span class="delete" @click="deleteFile(i)">
                      </span>
                                            </i>
                                        </template>

                                        <i class="btn-upfile" v-if="showUpBtn">
                                            <ax-icon class="icon-plus"></ax-icon>
                                            <label @click.stop="openFileSelect"></label>
                                            <input type="file" @change="selectFile" id="upImg" accept="image/*">
                                        </i>
                                    </div>
                                </dd>
                            </dl>
                            <dl v-if="state.data.type<3">
                                <dt>{{$t('form.workCategory')}}</dt>
                                <dd>
                                    <i class="input-icon" @click.stop="showCatDrop()">
                                        <input type="text" class="select" :value="state.data.category?state.data.category.name:''" readonly :placeholder="$t('form.plsSelect')">
                                        <i class="icon-box"><ax-icon class="icon-arrow-down"></ax-icon></i>
                                    </i>
                                    <drop-down ref="catDrop" :list="state.data.type===1?props.category_real:props.category_nft" :maxHeight="DropmenuHeight" :selected="state.data.category||{}" @select="selectCategory"></drop-down>
                                </dd>
                            </dl>
                            <dl v-if="state.data.type<3">
                                <dt>{{$t('form.creationTime')}}</dt>
                                <dd>
                                    <i class="input-icon" @click.stop="showYearDrop()">
                                        <input type="text" class="select" :value="state.data.create_y?state.data.create_y.name:''" readonly :placeholder="$t('form.plsSelect')">
                                        <i class="icon-box"><ax-icon class="icon-arrow-down"></ax-icon></i>
                                    </i>
                                    <drop-down ref="yearDrop" :list="props.create_y" :maxHeight="DropmenuHeight" :selected="state.data.create_y||{}" @select="selectYear"></drop-down>
                                </dd>
                            </dl>
                            <dl v-if="state.data.type===1">
                                <dt>{{$t('form.workSize.name')}}<span class="title-tips">（cm）</span></dt>
                                <dd class="work-size flex">
                                    <input type="text" step="0.1" min="0.0" v-model="state.data.length" :placeholder="$t('form.workSize.l')">
                                    <input type="text" step="0.1" min="0.0" v-model="state.data.width" :placeholder="$t('form.workSize.w')">
                                    <input type="text" step="0.1" min="0.0" v-model="state.data.height" :placeholder="$t('form.workSize.h')">
                                </dd>
                            </dl>
                            <dl>
                                <dt>{{$t('form.workStory')}}</dt>
                                <dd>
                                    <textarea placeholder="" v-model="state.data.descr" @blur="checkSubmit()"></textarea>
                                    <span class="text-count">{{ state.data.descr ? state.data.descr.length : 0 }}/500</span>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" v-if="deleteConfrim === true">
                <button type="button" class="btn-main save" @click="deleteWork">{{$t('form.confirm')}}</button>
            </div>
            <div class="modal-footer" v-else-if="state.data.listIndex === false">
                <button type="button" class="btn-main save" @click="sendWork" :disabled="!canSubmit">{{$t('form.save')}}</button>
            </div>
            <div class="modal-footer modify" v-else>
                <button type="button" class="btn-cancel cancel" @click="deleteConfrim=true">{{$t('form.delete')}}</button>
                <button type="button" class="btn-main save" @click="sendWork" :disabled="!canSubmit">{{$t('form.save')}}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount,watch } from 'vue'
import {useI18n} from "vue-i18n"
import AxIcon from "@/components/ax-dom/ax-icon.vue";
import DropDown from "./drop-down.vue";
const {locale,t} = useI18n();
import {UPFILE} from "/utils/api.js";

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}
const modalHeight = reactive({
    deleteHeight:'148px',
    nftHeight:'174px',
    PhysicalHeight:'502px'
})
const DropmenuHeight=ref('300px');
const isMobile = ref(false)
const resetHeight = ()=>{
    if(768 >= ~~window.innerWidth){
        modalHeight.deleteHeight='';
        modalHeight.nftHeight='';
        modalHeight.PhysicalHeight='';
        DropmenuHeight.value = '';
        isMobile.value = true;
    }else{
        modalHeight.deleteHeight='148px';
        modalHeight.nftHeight='502px';
        modalHeight.PhysicalHeight='502px';
        DropmenuHeight.value = '300px';
        isMobile.value = false;
    }
}
resetHeight();
window.addEventListener('resize',resetHeight)
//获取图片宽高
const getFiSize = (url)=>{
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.addEventListener('load', ()=>resolve(img.width+','+img.height))
        img.addEventListener('error', (error)=>reject(error))
        img.setAttribute('src',url)
    })
}
//删除作品其中一幅展示图片
const deleteFile = (index) => {
    state.data.images[index].status='deleted'
    showUpBtn.value=true;
    checkSubmit()
};
var preClick = 0;
const openFileSelect = () => {
    let _time = new Date().getTime();
    if(_time - preClick > 500){
        document.querySelector('#upImg').click();
    }
    preClick = _time
};

const active=ref(false)
const deleteConfrim=ref(false)


const state = reactive({
    data:{}
})
const props=defineProps({
    wallet:Boolean,
    category_nft:Array,
    category_real:Array,
    create_y:Array
})

const showUpBtn = ref(true)
const checkUpBtn = ()=>{
    let _imgCount=0;
    if(state.data.images && state.data.images.length){
        state.data.images.forEach((v,i)=>{
            if(v.status!=='deleted'){
                _imgCount++
            }
        })
    }
    showUpBtn.value = (_imgCount<9)
}
const upfilesCount=ref(0);

const canSubmit=ref(false)
const checkSubmit = ()=>{
    state.data.contract_address && (state.data.contract_address = state.data.contract_address.trim())
    state.data.name && (state.data.name = state.data.name.trim())
    state.data.descr && (state.data.descr = state.data.descr.trim())

    upfilesCount.value=0;
    for(let i=0;i<state.data.images.length;i++){
        (state.data.images[i].status==='loading' || state.data.images[i].status==='error')&&(upfilesCount.value++)
    }

    let validImg=false;
    //检测作品提交表单内容格式
    for(let i=0;i<state.data.images.length;i++){
        if(state.data.images[i].status==='finish'){
            validImg = true;
            break;
        }
    }
    switch (state.data.type){
        case 3:
            canSubmit.value = (
                state.data.name
                && state.data.contract_address
            )
            break;
        default:
            canSubmit.value = (
                state.data.name
                && state.data.images.length
                && validImg
                && upfilesCount.value===0
            )
    }
}

const toggleType = (type) => {
    if(state.data.type!==type){
        state.data.images.length && state.data.images.splice(0)
        state.data.type=type;
        state.data.category = {};
        upfilesCount.value=0;
        checkSubmit();
    }
}

const scrollBox=ref()

const show = (formData)=>{
    active.value=true;
    scrollBox.value.scrollTop = 0
    state.data={
        ...formData
    };
    checkSubmit();
    checkUpBtn();
}
const hide = ()=>{
    active.value=false;
    setTimeout(()=>{
        deleteConfrim.value = false;
        state.data={}
        catDrop.value && catDrop.value.hide();
        yearDrop.value && yearDrop.value.hide();
        canSubmit.value = false;
        showUpBtn.value = true;
        upfilesCount.value = 0;
    },600)
}
const catDrop=ref()
const yearDrop=ref()
const showCatDrop = () => {catDrop.value.show()}
const selectCategory = (item) => {state.data.category = item;}
const showYearDrop = () =>{yearDrop.value.show()}
const selectYear = (item) => {state.data.create_y = item;}
const maxText = (num) => {
    if(state.data.descr.length>500){
        state.data.descr = state.data.descr.slice(0,500)
    }
}

const selectFile = (e) => {
    if(e.target.files.length===0){return false;}
    if(!(/image/g.test(e.target.files[0].type))){
        document.querySelector('#upImg').value='';
        toast(t('form.upfileFormatTips'))
        return false;
    }
    if(e.target.files[0].size > 10485760){
        document.querySelector('#upImg').value='';
        toast(t('form.upfileMaxSizeTips'))
        return false;
    }

    if(e.target.files.length){
        const FileForm = new FormData();
        FileForm.append("file", e.target.files[0]);
        let _index = state.data.images.length;
        canSubmit.value = false; //锁定保存按钮
        state.data.images.push({
            binary:e.target.files[0],
            base64:'',
            url:'',
            fi_size:false,
            status:'loading'
        })
        checkSubmit();
        checkUpBtn();//檢測是否顯示上傳按鈕
        //获取图片base64数据
        getBase64(e.target.files[0]).then((base64)=>{
            state.data.images[_index].base64=base64;
            //获取图片宽高数据
            getFiSize(base64).then(fiSize=>{
                state.data.images[_index].fi_size=fiSize;
            })

        })
        //上传文件
        upFile2S3(_index);
    }
}
// 上传图片到S3
// imgIndex：图片在表单数组中的下标,false时添加到数组尾
const upFile2S3 = (imgIndex) => {
    let _IMG = state.data.images[imgIndex],FileForm = new FormData(),fileData = _IMG.binary;
    _IMG.status='loading';
    FileForm.append("file", fileData);
    UPFILE(`${window.api.api}/web/upload/aws_file`, FileForm).then((res) => {
        if (res.ret_code === 0){
            _IMG.url=res.data.playUrl;
            if(_IMG.status === 'loading'){
                _IMG.status = 'finish';
            }
            checkSubmit(); //检测表单，设置保存按钮的可点击状态
        }else{
            _IMG.status === 'loading' && (_IMG.status = 'error')
        }
    }).catch((err)=>{
        if(err.ret_code&&err.ret_code===99999){
            _IMG.status === 'loading' && (_IMG.status = 'error')
        }
    });
}

const emit = defineEmits(['sendWork','deleteWork'])
const sendWork = ()=>{
    emit('sendWork',state.data);
    hide();
}
const deleteWork = ()=>{
    emit('deleteWork',state.data);
    hide();
}
defineExpose({show,hide})
onMounted(()=>{
})
const fixFloat = (number)=>{
    if(number===''){
        return number
    }else{
        number = number.toString().split('.')
        if(number.length===1){
            number = number[0].substring(0,3)
        }else{
            number = number[0].substring(0,3)+'.'+number[1].substring(0,1)
        }
        return number;
    }
}
watch(()=>state.data,(n,o)=>{
    n.length && (n.length = fixFloat(n.length));
    n.width  && (n.width  = fixFloat(n.width));
    n.height && (n.height = fixFloat(n.height));
    n.name && (n.name = n.name.substring(0,60))
    n.descr && (n.descr = n.descr.substring(0,500))
},{ deep: true })

</script>
<style lang="scss" scoped>
.modal-wrap{
    position: fixed;
    left:0;
    top:0;
    overflow: hidden;
    width: 0;
    height: 0;
    z-index: 5000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 300ms,width 0s 300ms,height 0s 300ms;
    .modal-box{
        flex-shrink: 0;
        flex-grow: 0;
        width: 680px;
        background: #FFF;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        z-index: 5002;
        transform: translateY(40px);
        transition: transform 300ms;
    }
    .modal-close{
        font-size: 32px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: block;
        padding:4px;
        border-radius: 20px;
        position: absolute;
        top:64px;
        right:56px;
        &:hover{
            background: rgba(244, 244, 244, 0.9);
        }
    }
    .modal-header{
        padding:60px 0 48px;
        h2{
            font-size: 40px;
            text-align: center;
            font-weight: 800;
            line-height: 120%;
            color: rgba(0, 0, 0, 0.75);
        }
    }
    .modal-content{
        overflow: hidden;
        transition: height 300ms 300ms;
    }
    .tabs-content{
        height: 0;
        overflow-y: hidden;
        opacity: 0;
        transition: opacity 300ms ;
        &.show{
            opacity: 1;
            overflow-y: initial;
            height: initial;
            transition-delay: 700ms;
        }
    }
    .type-box{
        height: 0;
        overflow: hidden;
        opacity: 0;
        transition: opacity 300ms,height 0s 300ms;
        &.show{
            opacity: 1;
            height: initial;
            transition: opacity 300ms 700ms,height 0s;
            &.scroll-box{
                height: 100%;
                overflow-x: hidden;
                overflow-y: scroll;
            }
        }
    }
    .modal-footer{
        padding-top:26px;
        height: 142px;
        .save{
            font-size: 24px;
            width: 400px;
            margin: 0 auto;
        }
        &.modify{
            display: flex;
            justify-content: space-between;
            width: 579px;
            margin:0 auto;
            .save{
                margin: 0;
            }
            .cancel{
                width: 147px;
            }
        }
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
.form{
    width: 559px;
    margin:0 auto;
    >*{
        width: 559px;
        >dl{
            margin-top:40px;
            &:first-child{
                margin-top:0;
            }
        }
    }
    .full-width{
        width: 100%;
    }
    input{
        background: rgba(244, 244, 244, 0.9);
        border:0;
        border-radius: 8px;
        width: 100%;
        height: 70px;
        padding:0 24px;
        font-size: 18px;
        line-height: 32px;
        &.select{
            cursor: pointer;
        }
    }
    &::placeholder{
        color: rgba(0, 0, 0, 0.25);
    }
    textarea{
        display: block;
        padding: 24px;
        width: 559px;
        height: 160px;
        resize: none;
        border:0;
        background: rgba(244, 244, 244, 0.9);
        outline: none;
        border-radius: 8px;
        font-weight: 500;
        font-size: 18px;
        line-height: 120%;
    }
    .text-count{
        font-weight: 500;
        font-size: 14px;
        line-height: 120%;
        color: rgba(0, 0, 0, 0.25);
        margin-top:8px;
        text-align: right;
        display: block;
    }
    dt{
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.75);
        .title-tips{
            color: rgba(0, 0, 0, 0.45);
        }
    }
    dd{
        margin-top:16px;
        &.work-size{
            justify-content: space-between;
            >input{
                width: 178px;
            }
        }
        .work-pic-list{
            flex-wrap: wrap;
            justify-content: space-between;
            &::after{
                content: "";
                display: block;
                width: 178px;
            }
            >i{
                width: 178px;
                height:178px;
                display: block;
                border-radius: 10px;
                overflow: hidden;
                background: no-repeat center center;
                background-size: cover;
                position: relative;
                &:nth-child(n+4){
                    margin-top:12px;
                }
                span{
                    &.retry{
                        color: #fff;
                        background: rgba(0, 0, 0, 0.6);
                        border-radius: 10px;
                        font-style: normal;
                        font-weight: 500;
                        text-align: center;
                        font-size: 14px;
                        line-height: 29px;
                        display: block;
                        width: 100%;
                        height: 0;
                        white-space: nowrap;
                        position: absolute;
                        left:0;
                        bottom:0;
                        cursor: pointer;
                        z-index: 2;
                        overflow: hidden;
                        opacity: 0;
                        transition: height 0s 200ms,opacity 200ms linear;
                        &.show{
                            height: 30px;
                            opacity: 1;
                            transition: height 0s,opacity 200ms linear;
                        }
                    }
                    &.delete{
                        position: absolute;
                        z-index: 3;
                        right:4px;
                        top:4px;
                        cursor: pointer;
                        width: 20px;
                        height: 20px;
                        background: rgba(0, 0, 0, 0.6);
                        color: #fff;
                        font-size: 12px;
                        border-radius: 12px;
                        &::before,&::after{
                            content: '';
                            display: block;
                            width: 10px;
                            height: 2px;
                            background: #FFF;
                            position: absolute;
                            transform: rotate(45deg);
                            border-radius: 2px;
                            left: 5px;
                            top:9px;
                        }
                        &::after{
                            transform: rotate(-45deg);
                        }
                    }
                }
                &.btn-upfile{
                    border: 1px dashed #C4C4C4;
                    border-radius: 8px;
                    font-size: 60px;
                    color: #1A1A1A;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: none;
                    cursor: pointer;
                    >label{
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: absolute;
                        opacity: 0;
                        cursor: pointer;
                        z-index: 5;
                        overflow: hidden;
                    }
                    input#upImg{
                        position: absolute;
                        left: 100%;
                        top:100%;
                    }
                }

                &::after{
                    content: "";
                    display: block;
                    position: absolute;
                    z-index: 1;
                    width: 102%;
                    height: 102%;
                    left:-1%;
                    top:-1%;
                    background: rgba(255,255,255,.7);
                    opacity: 0;
                    transition: opacity 200ms linear;
                }
                &.loading{
                    //border: 1px dashed #C4C4C4;
                    &::before{
                        content: "";
                        display: block;
                        width: 24px;
                        height: 24px;
                        position: absolute;
                        z-index: 2;
                        background-image:
                            radial-gradient(circle at 12px 12px,transparent 9px,#fff 10px,#fff 10px,transparent 11px),
                            radial-gradient(circle at 12px 12px,transparent 8px,rgba(0,0,0,.8) 9px,rgba(0,0,0,.8) 11px,transparent 12px)
                    ;
                        background-size: 12px 12px, 100% 100%;
                        background-repeat: no-repeat;
                        animation: loadingRound 1s linear infinite;
                        @keyframes loadingRound {
                            from{
                                transform: rotate(0);
                            }
                            to{
                                transform: rotate(360deg);
                            }
                        }
                        left:calc(50% - 12px);
                        top:calc(50% - 12px);
                    }
                    &::after{
                        opacity: 1;
                    }
                }
                &.error{
                    //color:#EA415A;
                    //border: 1px dashed currentColor;
                    &::after{
                        opacity: 1;
                    }
                }
                &.deleted{
                    display: none;
                }
            }
        }
    }
}
.input-icon{
    position: relative;
    display: block;
    cursor: pointer;
    .icon-box{
        position: absolute;
        z-index: 2;
        font-size: 20px;
        top:25px;
        right:25px;
        color:#B1B1B1;
    }
}
.work-type-tabs{
    font-weight: 700;
    font-size: 20px;
    line-height: 120%;
    text-transform: capitalize;
    color: rgba(0, 0, 0, 0.75);
    padding-bottom: 40px;
    label{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        p{
            margin-left: 8px;
        }
        &:nth-child(n+2){
            margin-left: 40px;
        }
    }
}
.delete-work{
    p{
        text-align: center;
        font-weight: 500;
        font-size: 24px;
        line-height: 120%;
        color: rgba(0, 0, 0, 0.45);
    }
    .btn-cancel{
        width: 400px;
        margin:42px auto 0;
    }
}
.check-box{
    display: block;
    width: 1em;
    height: 1em;
    border: 2px solid #C4C4C4;
    border-radius: .5em;
    transition: border-color 200ms linear, border-width 200ms linear;
    &.active{
        border-width: .34em;
        border-color: #1a1a1a;
    }
}
.scroll-box{
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
}


@function rem($pxNum){
    @return calc($pxNum / 37.5) * 1px;
}
@media screen and (max-width:768px){
    .modal-wrap{
        .modal-box{
            width: 10px;
            height: 100%;
            background: #FFF;
            border-radius: 0;
            transform: translateX(10px);
            padding-top: constant(safe-area-inset-top);/* iOS < 11.2 */
            padding-top: env(safe-area-inset-top);/* iOS >= 11.2 */
            padding-bottom: constant(safe-area-inset-bottom);/* iOS < 11.2 */
            padding-bottom: env(safe-area-inset-bottom);/* iOS >= 11.2 */
        }
        .modal-close{
            font-size: rem(24);
            width: rem(44);
            height: rem(44);
            padding:rem(10);
            border-radius: rem(20);
            margin-top: constant(safe-area-inset-top);/* iOS < 11.2 */
            margin-top: env(safe-area-inset-top);/* iOS >= 11.2 */
            top:0;
            left:rem(5);
            right:initial;
        }
        .modal-header{
            padding:0;
            h2{
                font-size: rem(22);
                line-height: 200%;
            }
        }
        .modal-content{
            overflow: hidden;
            transition: none;
            height: calc(100% - rem(115));
        }
        .tabs-content{
            height: 0;
            overflow-y: hidden;
            opacity: 0;
            transition: opacity 300ms ;
            &.show{
                opacity: 1;
                overflow-y: initial;
                height: initial;
                transition-delay: 700ms;
            }
        }
        .type-box{
            &.delete-work{
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                &::before{
                    content: "";
                    display: block;
                }
                &.show{
                    height: 100%;
                }
                p{
                    font-size: rem(18);
                    line-height: 120%;
                    color: rgba(0, 0, 0, 0.45);
                }
                .btn-cancel{
                    width: rem(343);
                    margin:0 auto;
                }
            }
        }
        .modal-footer{
            padding:rem(12) rem(16);
            height: rem(71);
            .btn-main{
                height:rem(47);
                border-radius: rem(8);
                border: 0;
                padding:0;
            }
            .save{
                font-size: rem(18);
                margin:0;
                width: rem(343);
            }
            &.modify{
                font-size: rem(18);
                align-items: flex-start;
                width: rem(343);
                margin:0 auto;
                .save{
                    margin:0 0 0 rem(12);
                    width: rem(225);
                }
                .cancel{
                    margin:0;
                    width: rem(106);
                }
            }
        }
        &.active{
            opacity: 1;
            width: 100vw;
            height: 100%;
            transition: opacity 300ms,width 0s,height 0s;
            .modal-box{
                transform: translateX(0);
            }
        }
    }
    .form{
        width: rem(343);
        margin:0 auto;
        >*{
            width: rem(343);
            >dl{
                margin:0;
                padding-top:rem(20);
                &:first-child{
                    margin-top:0;
                }
            }
        }
        .full-width{
            width: 100%;
        }
        input{
            border-radius: rem(8);
            height: rem(56);
            padding:0 rem(12);
            font-size: rem(16);
            line-height: 120%;
        }
        textarea{
            display: block;
            padding: rem(12);
            width: rem(343);
            height: rem(140);
            border-radius: rem(8);
            font-weight: 400;
            font-size: rem(16);
            line-height: 120%;
        }
        .text-count{
            font-weight: 400;
            font-size: rem(14);
            line-height: 120%;
            margin-top:rem(8);
        }
        dt{
            font-weight: 700;
            font-size: rem(16);
            line-height: 120%;
        }
        dd{
            margin-top:rem(8);
            &.work-size{
                >input{
                    width: rem(106);
                }
            }
            .work-pic-list{
                flex-wrap: wrap;
                justify-content: space-between;
                &::after{
                    content: "";
                    display: block;
                    width: rem(106);
                }
                >i{
                    width: rem(106);
                    height:rem(106);
                    border-radius: rem(8);
                    &:nth-child(n+4){
                        margin-top:rem(12);
                    }
                    span{
                        &.retry{
                            border-radius: rem(6);
                            font-weight: 400;
                            font-size: rem(14);
                            line-height: rem(29);
                            &.show{
                                height: rem(29);
                            }
                        }
                        &.delete{
                            right:rem(4);
                            top:rem(4);
                            width: rem(20);
                            height: rem(20);
                            font-size: rem(12);
                            border-radius: rem(12);
                            &::before,&::after{
                                width: rem(10);
                                height: rem(2);
                                border-radius: rem(2);
                                left: rem(5);
                                top:rem(9);
                            }
                        }
                    }
                    &.btn-upfile{
                        border: rem(1) dashed #C4C4C4;
                        border-radius: rem(8);
                        font-size: rem(28);
                    }
                    &::after{
                        content: "";
                        display: block;
                        position: absolute;
                        z-index: 1;
                        width: 102%;
                        height: 102%;
                        left:-1%;
                        top:-1%;
                        background: rgba(255,255,255,.2);
                        opacity: 0;
                        transition: opacity 200ms linear;
                    }
                    &.loading{
                        &::before{
                            content: "";
                            display: block;
                            width: 24px;
                            height: 24px;
                            position: absolute;
                            z-index: 2;
                            background-image:
                                radial-gradient(circle at 12px 12px,transparent 9px,#fff 10px,#fff 10px,transparent 11px),
                                radial-gradient(circle at 12px 12px,transparent 8px,rgba(0,0,0,.8) 9px,rgba(0,0,0,.8) 11px,transparent 12px)
                        ;
                            background-size: 12px 12px, 100% 100%;
                            background-repeat: no-repeat;
                            animation: loadingRound 1s linear infinite;
                            @keyframes loadingRound {
                                from{
                                    transform: rotate(0);
                                }
                                to{
                                    transform: rotate(360deg);
                                }
                            }
                            left:calc(50% - 12px);
                            top:calc(50% - 12px);
                        }
                        &::after{
                            opacity: 1;
                        }
                    }
                    &.error{
                        &::after{
                            opacity: 1;
                        }
                    }
                    &.deleted{
                        display: none;
                    }
                }
            }
        }
    }
    .input-icon{
        position: relative;
        display: block;
        cursor: pointer;
        .icon-box{
            font-size: rem(14);
            top:rem(20);
            right:rem(20);
            transform: rotate(-90deg);
        }
    }
    .work-type-tabs{
        font-weight: 700;
        font-size: rem(16);
        line-height: 120%;
        padding: rem(20) 0 rem(10);
        overflow: scroll;
        &::-webkit-scrollbar{
            display: none;
        }
        label{
            p{
                margin-left: rem(8);
            }
            &:nth-child(n+2){
                margin-left: rem(24);
            }
        }
    }
    .check-box{
        display: block;
        width: 1em;
        height: 1em;
        border: .17em solid #C4C4C4;
        border-radius: .5em;
        transition: border-color 200ms linear, border-width 200ms linear;
        &.active{
            border-width: .34em;
            border-color: #1a1a1a;
        }
    }
}
</style>
