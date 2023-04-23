<!-- CREATE by WangXinzhao at 2022/11/29 21:02 -->
<template>
    <div class="user-setting">
        <h2>Setting</h2>
        <section>
            <div class="form">
                <div>
                    <dl>
                        <dt>Profile Image <i class="required-chart"></i></dt>
                        <dd>
                            <div class="work-pic-list flex">
                                <template v-for="(v,i) in state.data.images" :key="i">
                                    <i :style="{backgroundImage:`url(${v.base64 || v.url})`}"
                                       :class="v.status"
                                       v-if="v.status && v.status !== 'deleted'">
                                        <span class="retry" :class="{show:v.status==='error'}" @click.stop="upFile2S3(i)">{{$t('form.upRetry')}}</span>
                                        <span class="delete" @click="deleteFile(i),cacheFormData('images')"></span>
                                    </i>
                                </template>

                                <i class="btn-upfile" v-if="showUpBtn">
                                    <ax-icon class="icon-plus"></ax-icon>
                                    <label @click.stop="openFileSelect"></label>
                                    <input type="file" @change="selectFile" id="upImg" accept="image/*">
                                </i>
                            </div>
                            <error-tips v-if="formError.images">Please upload a photo.</error-tips>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Location <i class="required-chart"></i></dt>
                        <dd>
                            <i class="input-icon" @click.stop="showCountryDrop()">
                                <input autocomplete="off" type="text" class="select" readonly placeholder="Please Select" @change="cacheFormData('country')" :value="formData.country.name">
                                <i class="icon-box"><ax-icon class="icon-arrow-down"></ax-icon></i>
                            </i>
                            <drop-down v-if="countries" :list="countries" :selected="formData.country" ref="countryDrop" @select="selectCountry"></drop-down>
                            <error-tips v-if="formError.country">Please select.</error-tips>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Email <i class="required-chart"></i></dt>
                        <dd>
                            <input autocomplete="off"  type="text" :class="{error:formError.email}" v-model="formData.email" @blur="cacheFormData('email')" placeholder="Please Enter">
                            <error-tips v-if="formError.email">{{$t('form.errorTips.mail')}}</error-tips>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Full Name <i class="required-chart"></i><span class="title-tips"> (First Name And Last Name)</span></dt>
                        <dd>
                            <input autocomplete="off" class="only-en-char" type="text" :class="{error:formError.u_name}" placeholder="Please Enter" @blur="cacheFormData('u_name')" @keyup="clearFullChar()" v-model="formData.u_name" maxlength="99">
                            <error-tips v-if="formError.u_name">{{$t('form.errorTips.fullname')}}</error-tips>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Twitter <span class="title-tips" v-if="userBindStore.info.twitter"> ( Connected )</span></dt>
                        <dd>
                            <input autocomplete="off" type="text" placeholder="Please Enter" @blur="cacheFormData('twitter')" v-model="formData.twitter">
                            <error-tips v-if="formError.twitter">Your Twitter Address is invalid.</error-tips>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Instagram <span class="title-tips" v-if="userBindStore.info.instagram"> ( Connected )</span></dt>
                        <dd>
                            <input autocomplete="off" type="text" placeholder="Please Enter" @blur="cacheFormData('instagram')" v-model="formData.instagram">
                            <error-tips v-if="formError.instagram">Your Instagram Address is invalid.</error-tips>
                        </dd>
                    </dl>
                </div>
                <div class="submit-box">
                    <button type="button" @click="submitFormA" :disabled="!canSubmit || submitStatus===true" class="submit flex">
                        <i v-if="submitStatus===true" class="loading"></i><span>Save</span>
                    </button>
                </div>
                <div style="padding-top: 3em" v-if="false">
                    <dl v-if="false">
                        <dt>{{$t('form.yourWebsite')}} / {{$t('form.collection')}}</dt>
                        <dd>
                            <input autocomplete="off" type="text" placeholder="Please Enter" @blur="cacheFormData" v-model="formData.website">
                        </dd>
                    </dl>
                    <dl v-if="userBindStore.info.twitter">
                        <dt>Twitter<span class="title-tips"> ( Connected )</span></dt>
                        <dd>
                            <div class="like-input"><a :href="userBindStore.info.twitter" target="_blank">{{userBindStore.info.twitter}}</a></div>
                        </dd>
                    </dl>
                    <dl  v-if="userBindStore.info.instagram">
                        <dt>Instagram<span class="title-tips"> ( Connected )</span></dt>
                        <dd>
                            <div class="like-input"><a :href="userBindStore.info.instagram" target="_blank">{{userBindStore.info.instagram}}</a></div>
                        </dd>
                    </dl>
                </div>
            </div>
        </section>
    </div>
    <page-footer></page-footer>
    <artist-invite-artist ref="invite"></artist-invite-artist>
</template>
<script setup>
import {ref,toRefs, onMounted, reactive} from 'vue'
import {storeToRefs} from "pinia";
import DropDown from "@/views/components/modal/drop-down.vue";
import ErrorTips from "@/components/error-tips.vue";
import AxIcon from "@/components/ax-dom/ax-icon.vue";
import $dialog from "@/views/components/dialog";
import ArtistInviteArtist from "@/views/components/docs/artist-invite-artist.vue";
import {useI18n} from "vue-i18n"
const { locale, t } = useI18n()
import {useContriesStore} from "@/store/countries.js";
import {POST, UPFILE} from "/utils/api.js";
const countriesStore = useContriesStore();
const {countries} = storeToRefs(countriesStore);


import {useUserStore,useUserFormStore,useUserBindStore} from "@/store/user.js";
import PageFooter from "@/views/components/page-footer.vue";
import router from "@/router/index.js";

const userStore = useUserStore();
const formStore = useUserFormStore();
const userBindStore = useUserBindStore();

const state = reactive({
    formData:{
        selectCountry:false,
        agree:false,
        country:{id:'',name:''},
        website:'',
        instagram:'',
        twitter:'',
        email:'',
        u_name:'',
    },
    formError:{
        images:false,
        agree:false,
        country:false,
        website:false,
        instagram:false,
        twitter:false,
        email:false,
        u_name:false,
    },
    isDesktop:window.device.desktop(),
    canSubmit:false,
    submitStatus:false,
    data:{
        images:[]
    }
})
const {formData,formError,isDesktop,canSubmit,submitStatus} = toRefs(state)
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
    showUpBtn.value = (_imgCount===0)
}

const deleteFile = (index) => {
    state.data.images.shift()
    showUpBtn.value=true;
};

const clearFullChar = ()=>{
    formData.value.u_name = formData.value.u_name.replace(/[^\x00-\xff]+/g,'')
}
const check={
    isTwitter(url){
        // https://twitter.com/wangxinzhao1028
        return /^https:\/\/([^\s\/].)*twitter.com\/\S+/i.test(url) || /^\S*twi\S*/i.test(url)
    },
    isIns(url){
        // https://twitter.com/wangxinzhao1028
        return /^https:\/\/([^\s\/].)*instagram.com\/\S+/i.test(url) || /^\S*ins\S*/i.test(url)
    },
    isEmail(str){
        return /^[\da-z-_.]+@[\da-z-]+(.[\da-z-_]+)+$/i.test(str)
    },
    isHeadimg(){
        let res=false;
        for(let i=0; i < state.data.images.length; i++){
            if(state.data.images[i].status==='finish' || state.data.images[i].status===true){
                res=true;
                break;
            }
        }
        return res;
    },
    isUsername(str){
        return (!!str && str.length<100)
    }
}
const checkCanSubmit = (column) =>{
    if(column===false || column ==='images'){
        formError.value.images= !check.isHeadimg();
    }
    if(column===false || column ==='country'){
        formError.value.country = !formData.value.country && !formData.value.country.id;
    }
    if(column===false || column ==='email'){
        formError.value.email = formData.value.email && !check.isEmail(formData.value.email)
    }
    if(column===false || column ==='u_name'){
        formError.value.u_name = formData.value.u_name && !check.isUsername(formData.value.u_name)
    }
    if(column===false || column ==='twitter'){
        formError.value.twitter =  !!formData.value.twitter && !check.isTwitter(formData.value.twitter)
        console.log(formError.value.twitter)
    }
    if(column===false || column ==='instagram'){
        formError.value.instagram =  !!formData.value.instagram && !check.isIns(formData.value.instagram)
        console.log(formError.value.instagram)
    }

    canSubmit.value
        = check.isHeadimg()
        && !!formData.value.country.id
        && check.isEmail(formData.value.email)
        && check.isUsername(formData.value.u_name)
        && (formData.value.twitter==='' || check.isTwitter(formData.value.twitter))
        && (formData.value.instagram==='' || check.isIns(formData.value.instagram));
}
const cacheFormData = (column=false)=>{
    formData.value.email && (formData.value.email = formData.value.email.trim());
    formData.value.u_name && (formData.value.u_name = formData.value.u_name.trim());
    formData.value.website && (formData.value.website = formData.value.website.trim());
    formData.value.twitter && (formData.value.twitter = formData.value.twitter.trim());
    formData.value.instagram && (formData.value.instagram = formData.value.instagram.trim());
    checkCanSubmit(column)
}
const selectCountry = (item)=>{
    //item {id,name}
    formData.value.country=item;
    cacheFormData('country')
}
const countryDrop=ref()
const showCountryDrop = ()=>{
    countryDrop.value.show()
}

var preClick = 0;
const openFileSelect = () => {
    let _time = new Date().getTime();
    if(_time - preClick > 500){
        document.querySelector('#upImg').click();
    }
    preClick = _time
};
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

const getFiSize = (url)=>{
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.addEventListener('load', ()=>resolve(img.width+','+img.height))
        img.addEventListener('error', (error)=>reject(error))
        img.setAttribute('src',url)
    })
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
        state.data.images.push({
            binary:e.target.files[0],
            base64:'',
            url:'',
            fi_size:false,
            status:'loading'
        })
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
                cacheFormData('images');
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

const setUserStoreInfo2FormData = ()=>{
    for(let i=0;i<countries.value.length;i++){
        if(countries.value[i].id===userBindStore.info.country){
            formData.value.country=countries.value[i];
            break;
        }
    }
    if(userBindStore.info.headimg){
        showUpBtn.value=false;
        state.data.images.push({
            url:userBindStore.info.headimg,
            status:true
        })
    }
    formData.value.instagram=userBindStore.info.instagram||'';
    formData.value.twitter=userBindStore.info.twitter||'';
    formData.value.email=userBindStore.info.email||'';
    formData.value.u_name=userBindStore.info.u_name||'';
    // cacheFormData()
}
const getContries = async () => {
    await countriesStore.getContriesList(locale.value.replace(/-[^$]+/,''));
    setUserStoreInfo2FormData()
}

const submitFormA = () => {
    /*if(!workList.length){
        toast(t('form.addWorkTips'))
        return false;
    }*/
    let params={
        headimg:state.data.images.length?state.data.images[0].url:'',
        country:formData.value.country.id,
        email:formData.value.email,
        u_name:formData.value.u_name,
        twitter:formData.value.twitter,
        instagram:formData.value.instagram,
        // website:formData.value.website,
    }
    submitStatus.value = true
    POST(`${window.api.api}/art/role/apply`,params,{
        "USER-PFID":userStore.userinfo.pfid,
        "USER-TOKEN":userStore.userinfo.access_token
    }).then((res)=>{
        if(res.ret_code === 0){
            submitStatus.value=false;
            userStore.userinfo.headimg=params.headimg;
            userStore.userinfo.nickname=params.u_name;
            userBindStore.getBindinfo();
            $dialog({
                type: "success",
                callback(loading,closeFn){
                    router.push('/')
                    closeFn();
                }
            });
        }else{
            submitStatus.value=res.ret_msg;
            window.toast(submitStatus.value);
        }
    }).catch(err=>{
        if(err.ret_code===99999){
            submitStatus.value='[Network Error]';
            window.toast(submitStatus.value);
        }
    })
}


onMounted(() => {
    getContries();
})
</script>
<style lang="scss" scoped>
/** default style ----START---- **/
.user-setting{
    padding-bottom: 80px;
    h2{
        padding-top: 167px;
        font-style: italic;
        font-weight: 900;
        font-size: 45px;
        line-height: 120%;
        text-align: center;
    }
    .form{
        width: 778px;
        margin:0 auto;
        padding-top:77px;
        >*{
            width: 100%;
            >dl{
                margin-top:40px;
            }
        }
        .full-width{
            width: 100%;
        }

        .work-pic-list{
            flex-wrap: wrap;
            justify-content: flex-start;
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
        input,.like-input{
            background: rgba(244, 244, 244, 0.9);
            border:0;
            border-radius: 8px;
            width: 100%;
            height: 75px;
            padding:0 24px;
            font-size: 18px;
            line-height: 32px;
            &::placeholder{
                color: rgba(0, 0, 0, 0.25);
            }
            &.select{
                cursor: pointer;
            }
            &.error{
                border: 1px solid #EA415A;
            }
            &.only-en-char{
                -ms-ime-mode: disabled;
            }
        }
        .like-input{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            a{
                text-decoration: none;
                color: rgba(0, 0, 0, 0.75);
                &:hover{
                    color: #000;
                    text-decoration: underline;
                }
            }
        }
        .check-box{
            position: relative;
            cursor: pointer;
            >i{
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
            margin-top:16px;
            position: relative;
        }
        .form-tips{
            font-weight: 500;
            font-size: 18px;
            line-height: 120%;
            color: rgba(0, 0, 0, 0.45);
            text-transform: capitalize;
            width: 100%;
            margin-top:40px;
            a{
                color: #278BE5;
                text-decoration: none;
            }
        }
        .agree{
            font-weight: 500;
            font-size: 18px;
            line-height: 120%;
            color: rgba(0, 0, 0, 0.75);
            text-transform: capitalize;
            width: 100%;
            margin-top:30px;
        }
    }

    .submit-box{
        padding:70px 0 50px;
        padding-bottom: constant(safe-area-inset-bottom);/* iOS < 11.2 */
        padding-bottom: env(safe-area-inset-bottom);/* iOS >= 11.2 */
        .loading{
            font-size: 1.2em;
            width: 1em;
            height:1em;
            opacity: .7;
            position: absolute;
            transform: translateX(-120%);
            &::before{
                content: "";
                display: block;
                width: 1em;
                height: 1em;
                z-index: 2;
                background-image:
                    radial-gradient(circle at .5em .5em,transparent .375em,#fff 0.416667em,#fff 0.416667em,transparent 0.41667em),
                    radial-gradient(circle at .5em .5em,transparent .33333em,rgba(0,0,0,.8) .375em,rgba(0,0,0,.8) .4583333em,transparent .5em);
                background-size: .5em .5em, 100% 100%;
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
            }
            &::after{
                opacity: 1;
            }
        }
        button{
            width: 340px;
            height: 75px;
            background: linear-gradient(285.35deg, #3BDECD 16.94%, #F365AC 85.12%);
            border-radius: 50px;
            border:0;
            font-weight: 700;
            font-size: 24px;
            line-height: 120%;
            color: #FFFFFF;
            text-align: center;
            display: block;
            margin:0 auto;
            position: relative;
            &:disabled{
                filter: grayscale(1);
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
    .user-setting{
        .form{
            width: 76%;
            padding-top:67px;
        }
    }
}
@media only screen and (max-width: 768px) {
    // sm
    .user-setting{
        h2{
            padding-top: 120px;
            font-style: italic;
            font-weight: 900;
            font-size: 44px;
            line-height: 120%;
            text-align: center;
        }
        .form{
            width: 91.466667%;
            padding-top:54px;
            .work-pic-list{
                &::after{
                    width: 142px;
                }
                >i{
                    width: 142px;
                    height:142px;
                }
            }
            input,.like-input{
                height: 56px;
                font-size: 18px;
            }
            .input-icon{
                position: relative;
                display: block;
                cursor: pointer;
                .icon-box{
                    font-size: 20px;
                    top:18px;
                    right:25px;
                }
            }
            dt{
                font-size: 18px;
                line-height: 22px;
            }
        }
        .submit-box{
            button{
                height: 60px;
                font-size: 18px;
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    // sm0.9146666666666666
    .user-setting{
        h2{
            padding-top: 86px;
            font-style: italic;
            font-weight: 900;
            font-size: 32px;
            line-height: 120%;
            text-align: center;
        }
        .form{
            width: 91.466667%;
            padding-top:40px;
            .work-pic-list{
                &::after{
                    width: 142px;
                }
                >i{
                    width: 142px;
                    height:142px;
                }
            }
            input,.like-input{
                height: 56px;
                font-size: 15px;

            }
            .input-icon{
                position: relative;
                display: block;
                cursor: pointer;
                .icon-box{
                    font-size: 20px;
                    top:18px;
                    right:25px;
                }
            }
            dt{
                font-size: 15px;
                line-height: 18px;
            }
        }

        .submit-box{
            button{
                width: 165px;
                height: 50px;
                font-size: 15px;
            }
        }
    }
}
</style>
