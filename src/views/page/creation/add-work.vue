<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="add-work">
        <div class="add-work-box">
            <div class="add-work-content">
                <div class="type-box delete-work" :class="{show:deleteConfrim===true}">
                    <p>{{$t('form.deleteTips')}}</p>
                    <button type="button" class="btn-cancel" @click="deleteConfrim=false">{{$t('form.cancel')}}</button>
                </div>
                <div class="type-box" ref="scrollBox" :class="{show:deleteConfrim===false}" @mousewheel.stop>
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
                        <div class="tabs-content show">
                            <dl v-if="state.data.type===3">
                                <dt>{{$t('form.contractAddress')}}<i class="required-chart"></i></dt>
                                <dd>
                                    <input type="text" v-model="state.data.contract_address" @blur="checkSubmit('contractAddress')" maxlength="42" :placeholder="$t('form.plsEnter')">
                                </dd>
                                <error-tips v-if="state.error.contract_address">Contract Address is invalid.</error-tips>
                            </dl>
                            <dl>
                                <dt>{{$t('form.workName')}}<i class="required-chart"></i></dt>
                                <dd>
                                    <input type="text" v-model="state.data.name" @keyup="clearFullChar" @blur="checkSubmit()" :placeholder="$t('form.plsEnter') + '('+ $t('form.workNameTips') +')'">
                                </dd>
                            </dl>
                            <dl v-if="state.data.type<3">
                                <dt>{{$t('form.workImages')}}<i class="required-chart"></i></dt>
                                <dd>
                                    <div class="work-pic-list flex">
                                        <template v-for="(v,i) in state.data.images" :key="i">
                                            <!-- {{v}} -->
                                            <template v-if="(/image/g.test(v.type))">
                                                <i :style="{backgroundImage:`url(${v.base64 || v.url})`}"
                                                :class="v.status"
                                                v-if="v.status && v.status !== 'deleted'">
                                                    <span class="retry" :class="{show:v.status==='error'}" @click.stop="upFile2S3(i)">{{$t('form.upRetry')}}</span>
                                                    <span class="delete" @click="deleteFile(i)"></span>
                                                </i>
                                            </template>
                                            <template v-else>
                                                <div class="video-box" :class="v.status" v-if="v.status && v.status !== 'deleted'">
                                                    <video :src="v.url" width="178" height="178" controls></video>
                                                     <span class="retry" :class="{show:v.status==='error'}" @click.stop="upFile2S3(i)">{{$t('form.upRetry')}}</span>
                                                    <span class="delete" @click="deleteFile(i)"></span>
                                                </div>
                                            </template>
                                        </template>
                                        <i class="btn-upfile" v-if="showUpBtn">
                                            <ax-icon class="icon-plus"></ax-icon>
                                            <label @click.stop="openFileSelect"></label>
                                            <input type="file" @change="selectFile" id="upImg" accept="image/*,video/*">
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
                                    <drop-down ref="catDrop" :list="useCat.cat_nft" :maxHeight="DropmenuHeight" :selected="state.data.category||{}" @select="selectCategory"></drop-down>
                                </dd>
                            </dl>
                            <dl v-if="state.data.type<3">
                                <dt>{{$t('form.creationTime')}}</dt>
                                <dd>
                                    <i class="input-icon" @click.stop="showYearDrop()">
                                        <input type="text" class="select" :value="state.data.create_y?state.data.create_y.name:''" readonly :placeholder="$t('form.plsSelect')">
                                        <i class="icon-box"><ax-icon class="icon-arrow-down"></ax-icon></i>
                                    </i>
                                    <drop-down ref="yearDrop" :list="useCat.create_y" :maxHeight="DropmenuHeight" :selected="state.data.create_y||{}" @select="selectYear"></drop-down>
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
                            <dl class="form-tips">
                                <dd>
                                    Please agree to <span class="highlight pointer" @click="agreement.show()">the Artist Collaboration Notice</span> and confirm that none of your submissions contain infringing or unauthorized copyrighted material.*
                                </dd>
                            </dl>
                            <div class="work-type-tabs agree flex">
                                <label @click="(state.data.agree=!state.data.agree,checkSubmit())">
                                    <i class="check-box" :class="{active:state.data.agree===true}"></i><p> Agree</p>
                                </label>
                            </div>
                            <dl class="no-margin">
                                <dt class="flex">Invitation Code<!--<i class="required-chart"></i>--> &nbsp;<i class="faq-icon" @click.stop="invite.show()"></i></dt>
                                <dd>
                                    <input type="text" :readonly="inviteStore.inviteInfo" v-model="state.data.code" @keyup="clearFullChar" @blur="checkSubmit()" :placeholder="$t('form.plsEnter') + ' ( 6 characters)'">
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
                <button type="button" class="btn-main save" @click="sendWork" :disabled="!canSubmit || sending">{{$t('form.submit')}}</button>
            </div>
            <div class="modal-footer modify" v-else>
                <button type="button" class="btn-cancel cancel" @click="deleteConfrim=true">{{$t('form.delete')}}</button>
                <button type="button" class="btn-main save" @click="sendWork" :disabled="!canSubmit || sending">{{$t('form.save')}}</button>
            </div>
        </div>
        <artist-invite-artist ref="invite"></artist-invite-artist>
        <artist-in-residence-cooperation-agreement ref="agreement"></artist-in-residence-cooperation-agreement>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive, onBeforeMount,watch } from 'vue'
import {useI18n} from "vue-i18n"
import AxIcon from "@/components/ax-dom/ax-icon.vue";
import DropDown from "@/views/components/modal/drop-down.vue"
const {locale,t} = useI18n();
import {UPFILE} from "/utils/api.js";
import ArtistInviteArtist from "@/views/components/docs/artist-invite-artist.vue";
import ArtistInResidenceCooperationAgreement from "@/views/components/docs/artist-in-residence-cooperation-agreement.vue";
const invite = ref();
const agreement = ref();
import {useInviteStore} from "@/store/user.js";
const inviteStore = useInviteStore();

/*
*
        d={
            listIndex:false,// 作品信息內容在作品列表中的下標
            type:2, //int	作品类型：1实物，2数字
            name:'',  // 作品名称
            category:{}, // 作品分类id，name
            create_y:{},// 创作年代 id,name
            images:[],// 图片, 数组
            length:'', // int 长 ,单位cm或px
            width:'', // int 宽 ,单位cm或px
            height:'', // int 高 ,单位cm或px
            descr:'',//描述
            fi_size:'',//首图的长宽,格式：长,宽
            contract_address:'',//合约地址，数字作品时传
        }
    }else{
        d={
            ...workList[index],
            listIndex:index
        }
* */

const state = reactive({
    data:{
        listIndex:false,// 作品信息內容在作品列表中的下標
        type:2, //int	作品类型：1实物，2数字
        name:'',  // 作品名称
        category:{}, // 作品分类id，name
        create_y:{},// 创作年代 id,name
        images:[],// 图片, 数组
        length:'', // int 长 ,单位cm或px
        width:'', // int 宽 ,单位cm或px
        height:'', // int 高 ,单位cm或px
        descr:'',//描述
        fi_size:'',//首图的长宽,格式：长,宽
        contract_address:'',//合约地址，数字作品时传,
        agree:false,
        invite:'',
    },
    error:{
        contract_address:false,
    }
})
//獲取作品分類及創作年份列表
import {useCatStore} from "@/store/category.js";
import ErrorTips from "@/components/error-tips.vue";
const useCat = useCatStore();
const getCat = async () => {
    await useCat.getCatList(locale.value.replace(/-[^$]+/,''));
}

const props=defineProps({
    wallet:Boolean,
    category_nft:Array,
    category_real:Array,
    create_y:Array
})
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
const clearFullChar = ()=>{
    state.data.name = state.data.name.replace(/[^\x00-\xff]+/g,'')
    // console.log(state.data.name)
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
//获取视频宽高
// const getVideoSize = (url) => {
//   return new Promise((resolve, reject) => {
//     let video = document.createElement('video');
//     video.addEventListener('loadedmetadata', () => resolve(video.videoWidth + ',' + video.videoHeight));
//     video.addEventListener('error', (error) => reject(error));
//     video.src = url;
//   });
// };
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
const checkSubmit = (column)=>{
    state.data.contract_address && (state.data.contract_address = state.data.contract_address.trim())
    state.data.name && (state.data.name = state.data.name.trim())
    state.data.descr && (state.data.descr = state.data.descr.trim())
    state.data.code && (state.data.code = state.data.code.trim())
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
            if('contractAddress'===column){
                state.error.contract_address=!(/^0x[0-9a-f]{40}$/i.test(state.data.contract_address))
            }
            canSubmit.value = (
                (!!state.data.name)
                && !state.error.contract_address
                && state.data.agree
            )
            break;
        default:
            canSubmit.value = (
                (!!state.data.name)
                && (!!state.data.images.length)
                && validImg
                && (upfilesCount.value===0)
                && state.data.agree
                // && (!!state.data.code)
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
    if(!(/image|video/g.test(e.target.files[0].type))){
        document.querySelector('#upImg').value='';
        toast(t('form.upfileFormatTips'))
        return false;
    }
    ///图片限制10M 视频限制100M
    const _size = (/image/g.test(e.target.files[0].type))?10485760:104857600
    if(e.target.files[0].size > _size){
        document.querySelector('#upImg').value='';
        toast((/image/g.test(e.target.files[0].type)) ? t('form.upfileMaxSizeTips') : t('form.upfileMaxSizeTips100'))
        return false;
    }

    if(e.target.files.length){
        const FileForm = new FormData();
        FileForm.append("file", e.target.files[0]);
        let _index = state.data.images.length;
        canSubmit.value = false; //锁定保存按钮

        // console.log(e.target.files[0]);
        
        state.data.images.push({
            binary:e.target.files[0],
            base64:'',
            url:'',
            fi_size:false,
            status:'loading',
            type: e.target.files[0].type
        })
        checkSubmit();
        checkUpBtn();//檢測是否顯示上傳按鈕
        //获取图片base64数据
        getBase64(e.target.files[0]).then((base64)=>{
            state.data.images[_index].base64=base64;
            // console.log(state.data.images[_index]);
            if((/image/g.test(e.target.files[0].type))){
                //获取图片宽高数据
                getFiSize(base64).then(fiSize=>{
                    // console.log(fiSize);
                    state.data.images[_index].fi_size=fiSize;
                })
            }else{
                state.data.images[_index].fi_size='1,1';
            }
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

const emit = defineEmits(['deleteWork','postNewWorks'])
const sending = ref(false)
const sendWork = ()=>{
    sending.value = true;
    emit('postNewWorks',state.data);
    // hide();
}
const deleteWork = ()=>{
    emit('deleteWork',state.data);
    hide();
}
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
const getInviteinfo = async () => {
    await inviteStore.getInviteInfo();
    if(inviteStore.inviteInfo){
        state.data.code=inviteStore.inviteInfo
    }
}
const resetSending = () => {
    sending.value = false;
}
defineExpose({show,hide,resetSending})

onMounted(()=>{
    getCat();
    getInviteinfo();
    sending.value = false;
})
watch(()=>state.data,(n,o)=>{
    n.length && (n.length = fixFloat(n.length));
    n.width  && (n.width  = fixFloat(n.width));
    n.height && (n.height = fixFloat(n.height));
    n.name && (n.name = n.name.substring(0,60))
    n.descr && (n.descr = n.descr.substring(0,500))
},{ deep: true })

</script>
<style lang="scss" scoped>
.pointer{
    cursor: pointer;
}
.add-work{
    .add-work-box{
        margin:0 auto;
        background: #FFF;
        border-radius: 16px;
        position: relative;
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
    .add-work-content{
        //overflow: hidden;
        //transition: height 300ms 300ms;
    }
    .tabs-content{
        height: 0;
        //overflow-y: hidden;
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
        opacity: 0;
        overflow: hidden;
        transition: opacity 300ms,height 0s 300ms;
        &.show{
            overflow: visible;
            opacity: 1;
            height: initial;
            transition: opacity 300ms 700ms,height 0s;
        }
    }
    .modal-footer{
        padding-top:3em;
        height: 142px;
        .save{
            font-size: 24px;
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
    .form{
        width: 778px;
        margin:0 auto;
        padding-top:60px;
        >*{
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
            height: 75px;
            padding:0 24px;
            font-size: 18px;
            line-height: 32px;
            &.select{
                cursor: pointer;
                &:read-only{
                    color: #000;
                }
            }
            &:disabled{
                color: #c4c4c4;
            }
            &:read-only{
                color: #c4c4c4;
            }
        }
        &::placeholder{
            color: rgba(0, 0, 0, 0.25);
        }
        textarea{
            display: block;
            padding: 1em;
            width: 100%;
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
        dl{
            &.form-tips{
                margin-top:0;
                color: rgba(0, 0, 0, 0.7);
                .highlight{
                    font-weight: 800;
                    color: #3BDECD;
                }
                >dd{
                    margin-top:0;
                }
            }
            &.no-margin{
                margin-top:0;
            }
        }
        dt{
            font-weight: 700;
            font-size: 28px;
            line-height: 120%;
            color: rgba(0, 0, 0, 0.75);
            .title-tips{
                color: rgba(0, 0, 0, 0.45);
            }
        }
        dd{
            margin-top:20px;
            &.work-size{
                justify-content: space-between;
                >input{
                    width: 178px;
                }
            }
            .work-pic-list{
                flex-wrap: wrap;
                justify-content: flex-start;
                &::after{
                    content: "";
                    display: block;
                    width: 178px;
                }
                >i,>div.video-box{
                    width: 178px;
                    height:178px;
                    display: block;
                    border-radius: 10px;
                    overflow: hidden;
                    background: no-repeat center center;
                    background-size: cover;
                    position: relative;
                    margin:8px 16px 8px 0;
                    &:nth-child(4n+1){
                        margin-left:0;
                    }
                    video{
                        position: relative;
                        z-index: 2;
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
                            z-index: 3;
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
                            z-index: 4;
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
        font-size: 28px;
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
            .check-box{
                font-size: .7em;
            }
        }
        &.agree{
            margin-top:1em;
            font-size: 18px;
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
    .faq-icon{
        position: relative;
        font-style: normal;
        font-weight: 700;
        text-align: center;
        line-height: 120%;
        width: 1em;
        cursor: pointer;
        &::after{
            //height: .866667em;
            //width: 1em;
            //border-radius: 50%;
            //display: inline-block;
            font-size: .6em;
            line-height: 2em;
            content: "?";
            vertical-align: middle;
            color: #FFF;
            position: relative;
            //line-height: 100%;
            //top:0;
            z-index: 2;
            text-align: center;
            transform: translateY(50px);
        }
        &::before{
            height: .866667em;
            width: .866667em;
            border-radius: 50%;
            content: "";
            display: block;
            position: absolute;
            background: #c4c4c4;
            z-index: 1;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
        }
    }
}
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
    .add-work{
        .form{
            width: 76%;
            padding-top:67px;
            dl{
                dd{
                    .work-pic-list {
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        &::after {
                            content: "";
                            display: block;
                            width: 140px;
                        }
                        > i {
                            width: 140px;
                            height: 140px;
                            margin:8px 16px 8px 0;
                            &:nth-child(4n+1){
                                margin-left:0;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .add-work{
        .add-work-box{
            margin:0 auto;
            background: #FFF;
        }
        .form{
            width: 91.466667%;
            padding-top:54px;
            >*{
                >dl{
                    margin-top:40px;
                }
            }
            input{
                height: 56px;
                font-size: 18px;
            }
            textarea{
                font-size: 18px;
                line-height: 120%;
            }
            .text-count{
                font-size: 14px;
                line-height: 120%;
                margin-top:8px;
            }
            dt{
                font-size: 18px;
                line-height: 22px;
            }
            dd{
                margin-top:20px;
                &.work-size{
                    >input{
                        width: 178px;
                    }
                }
                .work-pic-list{
                    &::after{
                        width: 178px;
                    }
                    >i{
                        width: 178px;
                        height:178px;
                        border-radius: 10px;
                        &:nth-child(n+4){
                            margin-top:12px;
                        }
                        span{
                            &.retry{
                                background: rgba(0, 0, 0, 0.6);
                                border-radius: 10px;
                                font-size: 14px;
                                line-height: 29px;
                            }
                            &.delete{
                                right:4px;
                                top:4px;
                                width: 20px;
                                height: 20px;
                                font-size: 12px;
                                border-radius: 12px;
                                &::before,&::after{
                                    width: 10px;
                                    height: 2px;
                                    border-radius: 2px;
                                    left: 5px;
                                    top:9px;
                                }
                            }
                        }
                        &.btn-upfile{
                            border-radius: 8px;
                            font-size: 60px;
                        }
                        &.loading{
                            //border: 1px dashed #C4C4C4;
                            &::before{
                                width: 24px;
                                height: 24px;
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
                    }
                }
            }
        }
        .input-icon{
            .icon-box{
                font-size: 20px;
                top:18px;
                right:25px;
            }
        }
        .work-type-tabs{
            font-size: 18px;
            line-height: 22px;
            padding-bottom: 24px;
            label{
                p{
                    margin-left: 8px;
                }
                &:nth-child(n+2){
                    margin-left: 40px;
                }
            }
            &.agree{
                font-size: 18px;
            }
        }

        .modal-footer{
            .save{
                height: 60px;
                font-size: 18px;
                line-height: 24px;
            }
        }
        .delete-work{
            p{
                font-size: 24px;
            }
            .btn-cancel{
                width: 400px;
                margin:42px auto 0;
            }
        }
        .check-box{
            border: 2px solid #C4C4C4;
        }
    }
}
@media only screen and (max-width: 600px) {
    // xs
    .add-work{
        .add-work-box{
            margin:0 auto;
            background: #FFF;
            font-size: 15px;
            line-height: 18px;
        }
        .form{
            width: 91.466667%;
            padding-top:54px;
            >*{
                >dl{
                    margin-top:40px;
                }
            }
            input{
                height: 56px;
                font-size: 15px;
            }
            textarea{
                font-size: 15px;
                line-height: 18px;
            }
            .text-count{
                font-size: 14px;
                line-height: 120%;
                margin-top:8px;
            }
            dl{
                dt{
                    font-size: 15px;
                    line-height: 18px;
                }
                dd{
                    margin-top:20px;
                    &.work-size{
                        >input{
                            width: 178px;
                        }
                    }
                    .work-pic-list{
                        justify-content: space-between;
                        &::after{
                            width: 106px;
                        }
                        >i{
                            width: 106px;
                            height:106px;
                            border-radius: 10px;
                            margin:6px 0;
                            &:nth-child(n+4){
                                margin:6px 0;
                            }
                            span{
                                &.retry{
                                    background: rgba(0, 0, 0, 0.6);
                                    border-radius: 10px;
                                    font-size: 14px;
                                    line-height: 29px;
                                }
                                &.delete{
                                    right:4px;
                                    top:4px;
                                    width: 20px;
                                    height: 20px;
                                    font-size: 12px;
                                    border-radius: 12px;
                                    &::before,&::after{
                                        width: 10px;
                                        height: 2px;
                                        border-radius: 2px;
                                        left: 5px;
                                        top:9px;
                                    }
                                }
                            }
                            &.btn-upfile{
                                border-radius: 8px;
                                font-size: 60px;
                            }
                            &.loading{
                                //border: 1px dashed #C4C4C4;
                                &::before{
                                    width: 24px;
                                    height: 24px;
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
                        }
                    }
                }
            }
        }
        .input-icon{
            .icon-box{
                font-size: 20px;
                top:18px;
                right:25px;
            }
        }
        .work-type-tabs{
            font-size: 15px;
            line-height: 18px;
            padding-bottom: 18px;
            label{
                p{
                    margin-left: 8px;
                }
                &:nth-child(n+2){
                    margin-left: 40px;
                }
            }
            &.agree{
                font-size: 15px;
            }
        }

        .modal-footer{
            .save{
                width: 165px;
                height: 50px;
                font-size: 15px;
                line-height: 18px;
            }
        }
        .delete-work{
            p{
                font-size: 24px;
            }
            .btn-cancel{
                width: 400px;
                margin:42px auto 0;
            }
        }
        .check-box{
            border: 2px solid #C4C4C4;
        }
    }
}
</style>
