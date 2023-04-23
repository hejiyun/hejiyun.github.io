<!-- CREATE by WangXinzhao at 2022/5/30 16:42 -->
<template>
    <div class="pre-regist" :class="locale">
        <header>
            <div>
<!--                <img src="@/assets/images/main-logo.svg" class="logo">-->
<!--                <div class="slogan">{{$t('home.flag')}}</div>-->
<!--                <div class="intro swiper homeSwipter">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" :class="'intro-'+i" v-for="i in 4" :key="i">
                            <h3>{{$t(`home.desc.v${i}.title`)}}</h3>
                            <p>{{$t(`home.desc.v${i}.text`).replace('\n','')}}</p>
                        </li>
                    </ul>
                    <div class="swiper-pagination"></div>
                </div>-->
            </div>
        </header>
        <main>
<!--            <h2 class="ad-slogan">{{$t(`home.adSlogan`)}}</h2>-->
<!--            <p class="online-time">{{$t(`home.onlineTime`)}}</p>-->
            <div class="account-info" v-if="walletAddress || userinfo.pfid">
                <i class="headimg">
                    <ax-img :src="headimg || 'https://artex-backend.s3.ap-southeast-1.amazonaws.com/test/userpost/face/1/face_unknown.png'"></ax-img>
                </i>
                <p>{{ walletAddress ? walletAddress.replace(/^([^$]{6})[^$]+([^$]{4})$/i,'$1....$2') : userinfo.pfid}}</p>
                <p class="logout" @click.stop="logout()">{{$t('account.signOut')}}</p>
            </div>
            <template v-else>
<!--                <wallet v-if="isDesktop" :class="isDesktop" @connectWallet="connectWallet"></wallet>
                <WalletModal v-else :class="isDesktop" @connectWallet="connectWallet"></WalletModal>-->

                <WalletModal  @connectWallet="connectWallet"></WalletModal>
            </template>
            <up-success v-if="userinfo.ApplyStatus"></up-success>
            <section v-else>
                <div class="form">
                    <div>
                        <dl>
                            <dt>{{$t('form.local')}}<i class="required-chart"></i></dt>
                            <dd>
                                <i class="input-icon" @click.stop="showCountryDrop()">
                                    <input type="text" class="select" readonly :placeholder="$t('form.plsSelect')" @change="cacheFormData" :value="formData.country.name">
                                    <i class="icon-box"><ax-icon class="icon-arrow-down"></ax-icon></i>
                                </i>
                                <drop-down :list="countrylist" :selected="formData.country" ref="countryDrop" @select="selectCountry"></drop-down>
                            </dd>
                        </dl>
                        <dl>
                            <dt>{{$t('form.email')}}<i class="required-chart"></i></dt>
                            <dd>
                                <input type="text" :class="{error:formError.email}" v-model="formData.email" @blur="cacheFormData" :placeholder="$t('form.plsEnter')">
                                <error-tips v-if="formError.email">{{$t('form.errorTips.mail')}}</error-tips>
                            </dd>
                        </dl>
                        <dl>
                            <dt>{{$t('form.fullname')}}<i class="required-chart"></i><span class="title-tips">{{$t('form.fullnameTips')}}</span></dt>
                            <dd>
                                <input type="text" :class="{error:formError.fullname}" :placeholder="$t('form.plsEnter')+'（'+$t('form.unameTips')+'）'" @blur="cacheFormData" v-model="formData.u_name">
                                <error-tips v-if="formError.fullname">{{$t('form.errorTips.fullname')}}</error-tips>
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <dl>
                            <dt>{{$t('form.yourWebsite')}} / {{$t('form.collection')}}</dt>
                            <dd>
                                <input type="text" :placeholder="$t('form.plsEnter')" @blur="cacheFormData" v-model="formData.website">
                            </dd>
                        </dl>
                        <dl>
                            <dt>Instagram（URL）</dt>
                            <dd>
                                <input type="text" :placeholder="$t('form.plsEnter')" @blur="cacheFormData" v-model="formData.instagram">
                            </dd>
                        </dl>
                        <dl>
                            <dt>Twitter（URL）</dt>
                            <dd>
                                <input type="text" :placeholder="$t('form.plsEnter')" @blur="cacheFormData" v-model="formData.twitter">
                            </dd>
                        </dl>
                    </div>
                    <div class="form-tips">
                        {{$t('form.agreeTips.0')}}<a href="javascript:void(0);" @click.stop="agreement.show()">{{$t('form.agreeTips.1')}}</a>{{$t('form.agreeTips.2')}}<i class="required-chart"></i>
                    </div>
                    <div class="agree flex">
                        <div class="check-box flex" @click="toggleAgree()">
                            <i :class="{active:formData.agree}"></i>&nbsp;&nbsp;<span>{{$t('form.agree')}}</span>
                        </div>
                    </div>
                </div>
                <div class="work-added" v-if="workList.length">
                    {{$t('form.added')}} <span>{{workList.length}}{{$t('form.addedWorkUnit')}}</span> {{$t('form.works')}}
                </div>
                <ul class="form work-list" v-if="workList.length">
                    <li v-for="(v,i) in workList">
                        <i v-if="v.images.length" :style="{backgroundImage:`url(${v.images[0].url})`}"></i>
                        <!--            <p>{{v.type===3?v.contract_address.replace(/^([^$]{24})[^$]+([^$]{8})$/,'$1...$2'):v.name}}</p>-->
                        <p>{{v.name}}</p>
                        <div @click="showAddWork(i)">
                            <ax-icon class="icon-edit"></ax-icon>
                        </div>
                    </li>
                </ul>
                <button type="button" class="btn-add-work flex" @click="showAddWork(false)">
                    <ax-icon class="icon-plus"></ax-icon>
                    <span>{{$t('form.addWork')}} <i class="required-chart"></i></span>
                </button>
                <div class="submit-box">
                    <button type="button" @click="submitFormA" :disabled="!canSubmit || submitStatus===true" class="submit flex">
                        <i v-if="submitStatus===true" class="loading"></i><span>{{$t('form.submit')}}</span>
                    </button>
                </div>
            </section>
            <section class="faq-box">
                <h2>{{$t('faq.title')}}</h2>
                <ul class="faq-list">
                    <li v-for="v in 3" :key="v">
                        <h4>{{$t(`faq.list.q${v}.q`)}}</h4>
                        <article>
                            <p>{{$t(`faq.list.q${v}.a`)}}</p>
                        </article>
                    </li>
                </ul>
            </section>
        </main>
        <footer>
            <h5>{{$t('footer.title')}}</h5>
            <p>{{$t('footer.text')}}artex.xyz2022@gmail.com</p>
        </footer>
        <modal-add-work :category_real="category_real" :category_nft="category_nft" :create_y="create_y" @deleteWork="deleteWork" @sendWork="sendWork" :wallet="!!walletAddress" ref="addWork"></modal-add-work>
        <artist-in-residence-cooperation-agreement ref="agreement"></artist-in-residence-cooperation-agreement>
    </div>
</template>
<script setup>
import {ref, onMounted, reactive, toRefs, onBeforeMount, nextTick, watch} from 'vue'
import { useRouter } from 'vue-router'
import {POST,GET} from "/utils/api.js";
import {useI18n} from "vue-i18n"
const {locale,t} = useI18n();


import AxIcon from "@/components/ax-dom/ax-icon.vue";
import AxImg from "@/components/ax-dom/ax-img.vue";
import DropDown from "@/views/components/modal/drop-down.vue";
import Wallet from "@/views/components/wallet/index.vue"
import WalletModal from "@/views/components/wallet/indexmodal.vue"
import ModalAddWork from "@/views/components/modal/modal-add-work.vue";
import UpSuccess from "@/components/up-success.vue";
import ArtistInResidenceCooperationAgreement from "@/views/components/docs/artist-in-residence-cooperation-agreement.vue";

import ErrorTips from "@/components/error-tips.vue";

let CACHES = false;
const readCACHES = () => {
    if(window.localStorage.getItem('caches')){
        CACHES = JSON.parse(decodeURIComponent(atob(window.localStorage.getItem('caches'))));
        if(new Date().getTime()-86400000 > CACHES.time){
            CACHES = false;
        }
    }
}
readCACHES();

window.setCACHES = (key,data)=>{
    if(!CACHES){CACHES={time:new Date().getTime()}}
    CACHES[key]=data;
    window.localStorage.setItem('caches',btoa(encodeURIComponent(JSON.stringify(CACHES))))
}
window.getCACHES = (key)=>{
    return ((CACHES && CACHES[key]) ? CACHES[key] : null);
}
const isDesktop=ref(false)
if(!window.device.desktop()){
    window.localStorage.removeItem('walletconnect')
}
isDesktop.value=window.device.desktop();



const userinfo = reactive({
    walletAddress:'',
    headimg: "https://artex-backend.s3.ap-southeast-1.amazonaws.com/test/userpost/face/1/face_unknown.png",
    nickname: "",
    pfid: "",
    ApplyStatus: false,
})
const {walletAddress,headimg,nickname,pfid} = toRefs(userinfo);

const canSubmit = ref(false)

const checkMail = (str)=>{
    return /^[\da-z-_.]+@[\da-z-]+(.[\da-z-_]+)+$/i.test(str)
}
const checkCanSubmit = () =>{
    formData.email && (formError.email = !checkMail(formData.email));
    formData.u_name = formData.u_name.trim();
    formData.website = formData.website.trim();
    formData.twitter = formData.twitter.trim();
    canSubmit.value =
        userinfo.walletAddress && checkMail(formData.email) && formData.country.id && formData.u_name && formData.agree && workList.length;
}
const cacheFormData = ()=>{
    formData.email && (formData.email = formData.email.trim());
    formData.u_name && (formData.u_name = formData.u_name.trim());
    formData.website && (formData.website = formData.website.trim());
    formData.instagram && (formData.instagram = formData.instagram.trim());
    formData.twitter && (formData.twitter = formData.twitter.trim());
    setCACHES('formData',formData);
    checkCanSubmit()
}

const getFormData = () => {
    let _d = getCACHES('formData');
    if (!_d) return false;
    formData.agree=_d.agree;
    formData.country=_d.country;
    formData.website=_d.website;
    formData.instagram=_d.instagram;
    formData.twitter=_d.twitter;
    formData.email=_d.email;
    formData.u_name=_d.u_name;
}

const formData=reactive({
    agree:false,
    country:{id:'',name:''},
    website:'',
    instagram:'',
    twitter:'',
    email:'',
    u_name:'',
})
const formError=reactive({
    agree:false,
    country:false,
    website:false,
    instagram:false,
    twitter:false,
    email:false,
})

//添加作品
const addWork=ref() //添加 modal ref
const showAddWork = (index)=>{
    let d={};
    if(index===false){
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
    }
    addWork.value.show(d)
}

const workList=reactive([]);

const sendWork = (item)=>{
    //去除已删除图片，只保留图片数据url,fi_size
    let imgs = [];
    item.images.forEach((v,i)=>{
        if(v.status==='finish'){
            imgs.push({
                url:v.url,
                fi_size:v.fi_size,
                status:v.status
            })
        }
        // v=undefined;
    })
    item.images = JSON.parse(JSON.stringify(imgs));
    (item.listIndex===false) ? workList.push(item):(workList[item.listIndex] = JSON.parse(JSON.stringify(item)));
    checkCanSubmit();
}

const deleteWork = (item) => {
    workList.splice(item.listIndex,1)
}
const toggleAgree = ()=>{
    formData.agree = !formData.agree
    cacheFormData()
}
const selectCountry = (item)=>{
    //item {id,name}
    formData.country=item;
    cacheFormData()
}
const agreement = ref()

const isLocal = /^([\d.]+|localhost)$/.test(location.hostname);

// 链接钱包成功的回调事件  type:0签名成功的回调事件  1重复点击绑定钱包按钮的回调事件  2拒绝签名的回调事件  3等待确认签名
//obj是返回的数据   0是签名成功后台返回的所有数据  非0可以忽略
const connectWallet=(type,obj)=>{
  console.log(type,obj,"typetypetypetypetype");
    if(type === 0){
        userinfo.walletAddress = obj.walletAddress
        userinfo.headimg= obj.headimg || "https://artex-backend.s3.ap-southeast-1.amazonaws.com/test/userpost/face/1/face_unknown.png";
        userinfo.nickname= obj.nickname || '';
        userinfo.pfid= obj.pfid || '';
        setCACHES('userinfo',obj)
    }
}


//作品分类
const category_nft = ref([])
const category_real = ref([])

//创作年代
const create_y = ref([])

//國家列表
const countrylist = ref([])
const countryDrop=ref()
const showCountryDrop = ()=>{
    countryDrop.value.show()
}

const getCountryList = () => {
    if(getCACHES('countrys')){
        countrylist.value = getCACHES('countrys')
    }else{
        if(80 !== ~~location.port && 0 !== ~~location.port){
            let res = {"ret_code":0,"ret_msg":"操作成功.","sys":{"timing":24,"d":"0,0,0,0","r":0},"data":{"country":[{"id":"AD","name":"Andorra"},{"id":"AE","name":"United Arab Emirates"},{"id":"AF","name":"Afghanistan"},{"id":"AG","name":"Antigua and Barbuda"},{"id":"AI","name":"Anguilla"},{"id":"AL","name":"Albania"},{"id":"AM","name":"Armenia"},{"id":"AO","name":"Angola"},{"id":"AQ","name":"Antarctica"},{"id":"AR","name":"Argentina"},{"id":"AT","name":"Austria"},{"id":"AU","name":"Australia*"},{"id":"AW","name":"Aruba"},{"id":"AX","name":"Aland Islands"},{"id":"AZ","name":"Azerbaijan"},{"id":"BA","name":"Bosnia and Herzegovina"},{"id":"BB","name":"Barbados"},{"id":"BD","name":"Bangladesh"},{"id":"BE","name":"Belgium"},{"id":"BF","name":"Burkina Faso"},{"id":"BG","name":"Bulgaria"},{"id":"BH","name":"Bahrain"},{"id":"BI","name":"Burundi"},{"id":"BJ","name":"Benin"},{"id":"BL","name":"Saint Barthélemy"},{"id":"BM","name":"Bermuda"},{"id":"BN","name":"Brunei Darussalam"},{"id":"BO","name":"Bolivia, Plurinational State of"},{"id":"BQ","name":"Bonaire, Sint Eustatius and Saba"},{"id":"BR","name":"Brazil*"},{"id":"BS","name":"Bahamas"},{"id":"BT","name":"Bhutan"},{"id":"BV","name":"Bouvet Island"},{"id":"BW","name":"Botswana"},{"id":"BY","name":"Belarus"},{"id":"BZ","name":"Belize"},{"id":"CA","name":"Canada*"},{"id":"CC","name":"Cocos (Keeling) Islands"},{"id":"CD","name":"Congo, the Democratic Republic of the"},{"id":"CF","name":"Central African Republic"},{"id":"CG","name":"Congo"},{"id":"CH","name":"Switzerland"},{"id":"CI","name":"Cote d’Ivoire"},{"id":"CK","name":"Cook Islands"},{"id":"CL","name":"Chile"},{"id":"CM","name":"Cameroon"},{"id":"CN","name":"China*"},{"id":"CO","name":"Colombia"},{"id":"CR","name":"Costa Rica"},{"id":"CU","name":"Cuba"},{"id":"CV","name":"Cape Verde"},{"id":"CW","name":"Curaçao"},{"id":"CX","name":"Christmas Island"},{"id":"CY","name":"Cyprus"},{"id":"CZ","name":"Czech Republic"},{"id":"DE","name":"Germany"},{"id":"DJ","name":"Djibouti"},{"id":"DK","name":"Denmark"},{"id":"DM","name":"Dominica"},{"id":"DO","name":"Dominican Republic"},{"id":"DZ","name":"Algeria"},{"id":"EC","name":"Ecuador"},{"id":"EE","name":"Estonia"},{"id":"EG","name":"Egypt"},{"id":"EH","name":"Western Sahara"},{"id":"ER","name":"Eritrea"},{"id":"ES","name":"Spain"},{"id":"ET","name":"Ethiopia"},{"id":"FI","name":"Finland"},{"id":"FJ","name":"Fiji"},{"id":"FK","name":"Falkland Islands (Malvinas)"},{"id":"FO","name":"Faroe Islands"},{"id":"FR","name":"France"},{"id":"GA","name":"Gabon"},{"id":"GB","name":"United Kingdom"},{"id":"GD","name":"Grenada"},{"id":"GE","name":"Georgia"},{"id":"GF","name":"French Guiana"},{"id":"GG","name":"Guernsey"},{"id":"GH","name":"Ghana"},{"id":"GI","name":"Gibraltar"},{"id":"GL","name":"Greenland"},{"id":"GM","name":"Gambia"},{"id":"GN","name":"Guinea"},{"id":"GP","name":"Guadeloupe"},{"id":"GQ","name":"Equatorial Guinea"},{"id":"GR","name":"Greece"},{"id":"GS","name":"South Georgia and the South Sandwich Islands"},{"id":"GT","name":"Guatemala"},{"id":"GW","name":"Guinea-Bissau"},{"id":"GY","name":"Guyana"},{"id":"HM","name":"Heard Island and McDonald Islands"},{"id":"HN","name":"Honduras"},{"id":"HR","name":"Croatia"},{"id":"HT","name":"Haiti"},{"id":"HU","name":"Hungary"},{"id":"ID","name":"Indonesia"},{"id":"IE","name":"Ireland*"},{"id":"IL","name":"Israel"},{"id":"IM","name":"Isle of Man"},{"id":"IN","name":"India*"},{"id":"IO","name":"British Indian Ocean Territory"},{"id":"IQ","name":"Iraq"},{"id":"IR","name":"Iran, Islamic Republic of"},{"id":"IS","name":"Iceland"},{"id":"IT","name":"Italy*"},{"id":"JE","name":"Jersey"},{"id":"JM","name":"Jamaica"},{"id":"JO","name":"Jordan"},{"id":"JP","name":"Japan"},{"id":"KE","name":"Kenya"},{"id":"KG","name":"Kyrgyzstan"},{"id":"KH","name":"Cambodia"},{"id":"KI","name":"Kiribati"},{"id":"KM","name":"Comoros"},{"id":"KN","name":"Saint Kitts and Nevis"},{"id":"KP","name":"Korea, Democratic People’s Republic of"},{"id":"KR","name":"Korea, Republic of"},{"id":"KW","name":"Kuwait"},{"id":"KY","name":"Cayman Islands"},{"id":"KZ","name":"Kazakhstan"},{"id":"LA","name":"Lao People’s Democratic Republic"},{"id":"LB","name":"Lebanon"},{"id":"LC","name":"Saint Lucia"},{"id":"LI","name":"Liechtenstein"},{"id":"LK","name":"Sri Lanka"},{"id":"LR","name":"Liberia"},{"id":"LS","name":"Lesotho"},{"id":"LT","name":"Lithuania"},{"id":"LU","name":"Luxembourg"},{"id":"LV","name":"Latvia"},{"id":"LY","name":"Libya"},{"id":"MA","name":"Morocco"},{"id":"MC","name":"Monaco"},{"id":"MD","name":"Moldova, Republic of"},{"id":"ME","name":"Montenegro"},{"id":"MF","name":"Saint Martin (French part)"},{"id":"MG","name":"Madagascar"},{"id":"MK","name":"Macedonia, the former Yugoslav Republic of"},{"id":"ML","name":"Mali"},{"id":"MM","name":"Myanmar"},{"id":"MN","name":"Mongolia"},{"id":"MO","name":"Macao"},{"id":"MQ","name":"Martinique"},{"id":"MR","name":"Mauritania"},{"id":"MS","name":"Montserrat"},{"id":"MT","name":"Malta"},{"id":"MU","name":"Mauritius"},{"id":"MV","name":"Maldives"},{"id":"MW","name":"Malawi"},{"id":"MX","name":"Mexico*"},{"id":"MY","name":"Malaysia"},{"id":"MZ","name":"Mozambique"},{"id":"NA","name":"Namibia"},{"id":"NC","name":"New Caledonia"},{"id":"NE","name":"Niger"},{"id":"NF","name":"Norfolk Island"},{"id":"NG","name":"Nigeria"},{"id":"NI","name":"Nicaragua"},{"id":"NL","name":"Netherlands"},{"id":"NO","name":"Norway"},{"id":"NP","name":"Nepal"},{"id":"NR","name":"Nauru"},{"id":"NU","name":"Niue"},{"id":"NZ","name":"New Zealand"},{"id":"OM","name":"Oman"},{"id":"PA","name":"Panama"},{"id":"PE","name":"Peru"},{"id":"PF","name":"French Polynesia"},{"id":"PG","name":"Papua New Guinea"},{"id":"PH","name":"Philippines"},{"id":"PK","name":"Pakistan"},{"id":"PL","name":"Poland"},{"id":"PM","name":"Saint Pierre and Miquelon"},{"id":"PN","name":"Pitcairn"},{"id":"PS","name":"Palestine"},{"id":"PT","name":"Portugal"},{"id":"PY","name":"Paraguay"},{"id":"QA","name":"Qatar"},{"id":"RE","name":"Reunion"},{"id":"RO","name":"Romania"},{"id":"RS","name":"Serbia"},{"id":"RU","name":"Russian Federation"},{"id":"RW","name":"Rwanda"},{"id":"SA","name":"Saudi Arabia"},{"id":"SB","name":"Solomon Islands"},{"id":"SC","name":"Seychelles"},{"id":"SD","name":"Sudan"},{"id":"SE","name":"Sweden"},{"id":"SG","name":"Singapore"},{"id":"SH","name":"Saint Helena, Ascension and Tristan da Cunha"},{"id":"SI","name":"Slovenia"},{"id":"SJ","name":"Svalbard and Jan Mayen"},{"id":"SK","name":"Slovakia"},{"id":"SL","name":"Sierra Leone"},{"id":"SM","name":"San Marino"},{"id":"SN","name":"Senegal"},{"id":"SO","name":"Somalia"},{"id":"SR","name":"Suriname"},{"id":"SS","name":"South Sudan"},{"id":"ST","name":"Sao Tome and Principe"},{"id":"SV","name":"El Salvador"},{"id":"SX","name":"Sint Maarten (Dutch part)"},{"id":"SY","name":"Syrian Arab Republic"},{"id":"SZ","name":"Swaziland"},{"id":"TC","name":"Turks and Caicos Islands"},{"id":"TD","name":"Chad"},{"id":"TF","name":"French Southern Territories"},{"id":"TG","name":"Togo"},{"id":"TH","name":"Thailand"},{"id":"TJ","name":"Tajikistan"},{"id":"TK","name":"Tokelau"},{"id":"TL","name":"Timor-Leste"},{"id":"TM","name":"Turkmenistan"},{"id":"TN","name":"Tunisia"},{"id":"TO","name":"Tonga"},{"id":"TR","name":"Turkey"},{"id":"TT","name":"Trinidad and Tobago"},{"id":"TV","name":"Tuvalu"},{"id":"TZ","name":"Tanzania, United Republic of"},{"id":"UA","name":"Ukraine"},{"id":"UG","name":"Uganda"},{"id":"US","name":"United States*"},{"id":"UY","name":"Uruguay"},{"id":"UZ","name":"Uzbekistan"},{"id":"VA","name":"Holy See (Vatican City State)"},{"id":"VC","name":"Saint Vincent and the Grenadines"},{"id":"VE","name":"Venezuela, Bolivarian Republic of"},{"id":"VG","name":"Virgin Islands, British"},{"id":"VN","name":"Vietnam"},{"id":"VU","name":"Vanuatu"},{"id":"WF","name":"Wallis and Futuna"},{"id":"WS","name":"Samoa"},{"id":"YE","name":"Yemen"},{"id":"YT","name":"Mayotte"},{"id":"ZA","name":"South Africa"},{"id":"ZM","name":"Zambia"},{"id":"ZW","name":"Zimbabwe"}]}};
            if(0 === res.ret_code){
                countrylist.value = res.data.country;
                setCACHES('countrys',res.data.country)
            }

        }else{
            GET(`${window.api.api}/art/system/countries`,null,{
                locale:locale.value.replace(/-[^$]+/,'')
            }).then(res=>{
                if(0 === res.ret_code){
                    countrylist.value = res.data.country;
                    setCACHES('countrys',res.data.country)
                }
            });
        }
    }
}
const getUserinfo = () => {
    if(getCACHES('userinfo')){
        userinfo.walletAddress = getCACHES('userinfo').walletAddress
        userinfo.nickname = getCACHES('userinfo').nickname||''
        userinfo.pfid = getCACHES('userinfo').pfid||''
        userinfo.headimg = getCACHES('userinfo').headimg||''
        userinfo.ApplyStatus = getCACHES('userinfo').ApplyStatus||false
    }
}


const getPrepare = () => {
    if(getCACHES('category_real') && getCACHES('create_y')){
        category_nft.value = getCACHES('category_nft')
        category_real.value = getCACHES('category_real')
        create_y.value = getCACHES('create_y')
    }else{
        if(80 !== ~~location.port && 0 !== ~~location.port){
            let res = {"ret_code":0,"ret_msg":"操作成功.","sys":{"timing":25,"d":"0,0,0,0","r":0},"data":{"category_list_real":[{"id":1,"name":"油畫","exist_h":0},{"id":2,"name":"丙烯","exist_h":0},{"id":3,"name":"水彩","exist_h":0},{"id":4,"name":"雕塑","exist_h":1},{"id":6,"name":"綜合材料","exist_h":0},{"id":7,"name":"裝置","exist_h":1},{"id":9,"name":"素描","exist_h":0},{"id":13,"name":"插畫","exist_h":0},{"id":14,"name":"衍生品","exist_h":0},{"id":15,"name":"传统绘画","exist_h":0},{"id":99,"name":"其它","exist_h":0}],"category_list_nft":[{"id":50,"name":"摄影","exist_h":0},{"id":51,"name":"绘画","exist_h":0},{"id":52,"name":"视频","exist_h":0},{"id":53,"name":"动画表现","exist_h":0},{"id":54,"name":"AI创作","exist_h":0},{"id":55,"name":"表情","exist_h":0},{"id":99,"name":"其它","exist_h":0}],"create_y_list":[{"id":2022,"name":"2022"},{"id":2021,"name":"2021"},{"id":2020,"name":"2020"},{"id":2019,"name":"2019"},{"id":2018,"name":"2018"},{"id":700,"name":"2017~2012"},{"id":600,"name":"2011~2006"},{"id":500,"name":"2005~2000"},{"id":400,"name":"2000 年代"},{"id":300,"name":"1990 年代"},{"id":200,"name":"1980 年代"},{"id":100,"name":"1980 以前"}]}}
            if(0 === res.ret_code){
                setCACHES('category_nft',res.data.category_list_nft)
                setCACHES('category_real',res.data.category_list_real)
                setCACHES('create_y',res.data.create_y_list)
                category_nft.value = res.data.category_list_nft
                category_real.value = res.data.category_list_real
                create_y.value = res.data.create_y_list
            }
        }else{
            GET(`${window.api.api}/web/works/create/prepare`,'',{
                locale:locale.value.replace(/-[^$]+/,'')
            }).then(res=>{
                if(0 === res.ret_code){
                    setCACHES('category_nft',res.data.category_list_nft)
                    setCACHES('category_real',res.data.category_list_real)
                    setCACHES('create_y',res.data.create_y_list)
                    category_nft.value = res.data.category_list_nft
                    category_real.value = res.data.category_list_real
                    create_y.value = res.data.create_y_list
                }
            });
        }
    }
}
const submitStatus=ref(false)

const submitFormA = () => {
    if(!workList.length){
        toast(t('form.addWorkTips'))
        return false;
    }
    let params={
        u_name:formData.u_name,
        country:formData.country.id,
        website:formData.website,
        instagram:formData.instagram,
        twitter:formData.twitter,
        email:formData.email,
    }
    if(userinfo.walletAddress){
        params.wallet = userinfo.walletAddress
    }
    submitStatus.value = true
    POST(`${window.api.api}/art/role/apply`,params).then((res)=>{
        if(res.ret_code === 0){
            userinfo.pfid = res.data.pfid
            setCACHES('userinfo',userinfo)
            submitFormB(0);
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
const getObjValue = (arr) => {
    let _v=[];
    arr.forEach((v)=>{
        _v.push(v.url)
    })
    return _v;
}
const submitFormB = (index) => {
    if(index >= workList.length){
        submitStatus.value = false;
        userinfo.ApplyStatus=true;
        workList.splice(0)
        checkCanSubmit();
        setCACHES('userinfo',userinfo);
        return false;
    }
    let params;
    if(workList[index].type<3){
        params={
            pfid:         userinfo.pfid,
            type:         1,//1爲實物與數字作品，2爲NFT作品
            name:         workList[index].name,
            category:     workList[index].category.id,
            create_y:     workList[index].create_y.id,
            images:       JSON.stringify(getObjValue(workList[index].images)),
            length:       workList[index].length,
            width:        workList[index].width,
            height:       workList[index].height,
            descr:        workList[index].descr,
            fi_size:      workList[index].images[0].fi_size,
        }
    }else{
        params={
            pfid:             userinfo.pfid,
            type:             2,//1爲實物與數字作品，2爲NFT作品
            name:             workList[index].name,
            descr:            workList[index].descr,
            contract_address: workList[index].contract_address,
        }
    }
    POST(`${window.api.api}/web/works/create`,params).then((res)=>{
        if(res.ret_code === 0){
            submitFormB(index+1)
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
const logout = () => {
    window.localStorage.removeItem('caches')
    walletAddress.value = userinfo.walletAddress = undefined;
    nickname.value = userinfo.nickname = undefined;
    pfid.value = userinfo.pfid = undefined;
    headimg.value = userinfo.headimg = "https://artex-backend.s3.ap-southeast-1.amazonaws.com/test/userpost/face/1/face_unknown.png";
    userinfo.ApplyStatus = undefined;
    CACHES.userinfo=undefined;
    /*  formData.agree = false;
      formData.country = {id:'',name:''};
      formData.website = '';
      formData.instagram = '';
      formData.twitter = '';
      formData.email = '';
      formData.u_name = '';
      workList.splice(0)*/

    readCACHES()
    getUserinfo()
    // console.log(userinfo.walletAddress,walletAddress.value)
}
onBeforeMount(()=>{
    document.querySelector('html').style.backgroundColor='#D7D7D7'
    document.querySelector('body').style.backgroundColor='#D7D7D7'
    document.querySelector('html').scrollTop=0
    document.querySelector('body').scrollTop=0
    getCountryList();
    getPrepare()
    getUserinfo();
    getFormData();
})



onMounted(()=>{
    checkCanSubmit();
    if(window.innerWidth<=768){
        nextTick(()=>{
            let runSwiper = setInterval(()=>{
                if(window.Swiper){
                    initSwiper();
                    clearInterval(runSwiper)
                }
            },10)
        })
    }
})
const swiper = ref(false)
const initSwiper = () => {
    if(window.innerWidth<=768){
        if(swiper.value){swiper.value.destroy(true,false)}
        swiper.value = new Swiper(".homeSwipter", {
            autoplay:{
                delay:6000,
            },
            loop:true,
            pagination: {
                el: '.swiper-pagination',
                type:'progressbar',
            },
        });
    }else{
        if(swiper.value){
            swiper.value.destroy(true,true); //移除所有监听事件
            swiper.value = false;
        }
    }
}
window.addEventListener('resize',initSwiper)
watch(()=>formData,(n,o)=>{
    n.u_name =n.u_name.substring(0,20)
},{ deep: true })
</script>
<style lang="scss" scoped>
header{
    width: 100%;
    background: url("@/assets/images/home_bg.jpg") no-repeat center top;
    background-size: cover;
    >div{
        width: 1388px;
        height: 1080px;
        margin:0 auto;
        position: relative;
    }
    .slogan{
        text-align: center;
        font-size: 18px;
        line-height: 26px;
        font-weight: 500;
        padding-top:20px;
        color:#FFF;
    }
    .intro{
        color:#FFF;
        position: absolute;
        bottom:60px;
        left:0;
        width: 1388px;
        margin:0 auto;
        ul{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            li{
                flex-grow: 0;
                flex-shrink: 0;
                width: 284px;
                h3{
                    text-align: center;
                    font-size: 18px;
                    line-height: 22px;
                    font-weight: 800;
                }
                p{
                    margin-top:24px;
                    font-size: 14px;
                    line-height: 19px;
                    font-weight: 400;
                    color: rgba(255,255,255,.7);
                }
            }
        }
    }
}
.logo{
    width: 280px;
    padding-top:303px;
    margin:0 auto;
}
main{
    width: 1388px;
    margin: 0 auto;
    >section{
        padding:60px;
        margin:50px auto 0;
        width: 1300px;
        background: #FFF;
        border-radius: 16px;
    }
}
h2{
    font-size: 44px;
    line-height: 52px;
    text-align: center;
    padding:0;
    margin: 0;
    &.ad-slogan{
        margin: 80px 0 0;
    }
}
.online-time{
    font-size: 18px;
    line-height: 22px;
    font-weight: 500;
    text-align: center;
    margin:24px 0 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.45);
}
.account-info{
    margin-top:40px;
    .headimg{
        display: block;
        width: 52px;
        height: 52px;
        border-radius: 26px;
        overflow: hidden;
        margin:0 auto;
    }
    p{
        font-weight: 400;
        font-size: 18px;
        line-height: 120%;
        text-align: center;
        color: #8B8B8B;
        margin-top:8px;
        &.logout{
            margin-top:12px;
            font-size: 14px;
            line-height: 120%;
            cursor: pointer;
        }
    }
}
.form{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    >*{
        width: 559px;
        >dl{
            margin-top:40px;
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
        &::placeholder{
            color: rgba(0, 0, 0, 0.25);
        }
        &.select{
            cursor: pointer;
        }
        &.error{
            border: 1px solid #EA415A;
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
        font-size: 20px;
        line-height: 24px;
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
button{
    cursor: pointer;
    &.btn-add-work{
        width: 500px;
        height: 70px;
        font-size: 20px;
        line-height: 24px;
        font-weight: 700;
        border: 1px dashed rgba(0, 0, 0, 0.75);
        border-radius: 40px;
        background: transparent;
        margin: 40px auto 0;
        justify-content: center;
        align-items: center;
        :nth-child(2){
            margin-left: 8px;
        }
    }
    &.submit{
        width: 500px;
        height: 77px;
        font-size: 20px;
        line-height: 24px;
        font-weight: 800;
        border: 0;
        color:#FFF;
        border-radius: 40px;
        background: #1A1A1A;
        margin: 40px auto 0;
        justify-content: center;
        align-items: center;
        :nth-child(2){
            margin-left: 8px;
        }
        &:disabled{
            background: #C4C4C4;
        }
    }
}
.work-added{
    margin-top: 40px;
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    text-transform: capitalize;
    color: rgba(0, 0, 0, 0.75);
    span{
        color: #EA415A;
    }
}
.work-list{
    margin-top:16px;
    li{
        height: 104px;
        padding:14px;
        background: rgba(244, 244, 244, 0.9);
        border-radius: 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        >i{
            flex-grow: 0;
            flex-shrink: 0;
            width: 80px;
            height: 80px;
            border-radius: 10px;
            overflow: hidden;
            background: no-repeat center center;
            background-size: cover;
        }
        p{
            flex-grow: 1;
            flex-shrink: 1;
            margin-left: 32px;
            font-weight: 700;
            font-size: 18px;
            line-height: 120%;
            color: rgba(0, 0, 0, 0.75);
        }
        >div{
            flex-grow: 0;
            flex-shrink: 0;
            width: 48px;
            height: 48px;
            font-size: 24px;
            color:#979797;
            padding:12px;
            cursor: pointer;
        }
        &:nth-child(n+3){
            margin-top: 24px;
        }
    }
}
.faq-list{
    li{
        margin-top:50px;
    }
    h4{
        font-weight: 700;
        font-size: 24px;
        line-height: 120%;
        color: rgba(0, 0, 0, 0.75);
    }
    article{
        padding:20px 0 0;
        p{
            font-weight: 500;
            font-size: 16px;
            line-height: 140%;
            color: rgba(0, 0, 0, 0.75);
        }
    }
}
footer{
    text-align: center;
    padding:52px 0 72px;
    h5{
        font-weight: 700;
        font-size: 18px;
        line-height: 120%;
        text-align: center;
        color: rgba(0, 0, 0, 0.75);
    }
    p{
        font-weight: 500;
        font-size: 12px;
        line-height: 140%;
        text-align: center;
        color: rgba(0, 0, 0, 0.45);
        margin-top:12px;
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

:deep(.required-chart){
    position: relative;
    &::after{
        content: "";
        display: inline-block;
        width: .4em;

    }
    &::before{
        position: absolute;
        top:0;
        color:#EA415A;
        content: "*";
        font-style: normal;
        //font-size: .8em;
    }
}
.zh-TW{
    :deep(.required-chart){
        &::before{
        }
    }
}

@function rem($pxNum){
    @return calc($pxNum / 37.5) * 1px;
}
@media screen and (max-width:768px){
    header{
        background-image: url("@/assets/images/mobile/top-cover.jpg");
        >div{
            width: 10px;
            height: 659px;
            backdrop-filter: blur(3px);
        }
        .slogan{
            font-size: 12px;
            line-height: 17px;
            padding-top:12px;
        }
        .intro{
            left:0;
            bottom:0;
            width: 10px;
            height: 180px;
            --swiper-pagination-color: #FFF;/* 两种都可以 */
            .swiper-pagination{
                width: 145px;
                background:rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                height: 2px;
                top:initial;
                bottom:12px;
                left:115px;
                .swiper-pagination-progressbar-fill{
                    border-radius: 2px;
                }
            }
            ul{
                //display: block;
                height: 100%;
                width: 100%;
                li{
                    width: 10px;
                    h3{
                        font-size: 20px;
                        line-height: 28px;
                    }
                    p{
                        margin-top:12px;
                        font-size: 14px;
                        line-height: 20px;
                        color: #FFF;
                        text-align: center;
                        padding:0 24px
                    }
                }
            }
        }
    }
    .pre-regist.en-US{
        header{
            .intro{
                ul{
                    li{
                        &.intro-2{
                            h3{
                                transform: scaleX(.94);
                            }
                        }
                    }
                }
            }
        }
    }
    .logo{
        width: rem(151.9);
        padding-top:247px;
    }
    main{
        width: 10px;
        margin: 0 auto;
        background: #FFF;
        >section{
            padding:8px 16px 32px;
            margin:0 auto 0;
            width: 10px;
            border-radius: 0;
            &.faq-box{
                padding-top:32px;
                position: relative;
                &::before{
                    content: "";
                    display: block;
                    width: 343px;
                    position: absolute;
                    z-index: 1;
                    left: 16px;
                    top:0;
                    border-bottom: 1px solid rgba(219, 219, 219, 0.8);
                }
            }
        }
    }
    h2{
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: rgba(0,0,0,75);
        &.ad-slogan{
            margin: 0;
            padding-top:32px
        }
    }
    .online-time{
        font-size: 14px;
        line-height: rem(16.8);
        font-weight: 400;
        margin:8px 0 0;
    }
    .account-info{
        margin-top:24px;
        .headimg{
            width: 80px;
            height: 80px;
            border-radius: 8px;
        }
        p{
            font-weight: 400;
            font-size: 16px;
            margin-top:12px;
            &.logout{
                width: 4em;
                margin:12px auto 0;
                font-size: 14px;
            }
        }
    }
    .form{
        display: block;
        justify-content: initial;
        flex-wrap: initial;
        >*{
            width: 343px;
            >dl{
                margin-top:24px;
            }
        }
        input{
            background: rgba(244, 244, 244, 0.9);
            border:0;
            border-radius: 8px;
            width: 100%;
            height: 56px;
            padding:0 12px;
            font-size: 16px;
            line-height: 20px;
        }
        .check-box{
            font-size: 16px;
            user-select: none;
            >i{
                border: .17em solid #C4C4C4;
                border-radius: .5em;
            }
        }
        dt{
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
        }
        dd{
            margin-top:8px;
        }
        .form-tips{
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            margin-top:20px;
        }
        .agree{
            font-weight: 500;
            font-size: 14px;
            margin-top:20px;
        }
    }
    button{
        cursor: pointer;
        &.btn-add-work{
            color: rgba(0, 0, 0, 0.75);
            width: 343px;
            height: 51px;
            font-size: 16px;
            line-height: 120%;
            border: 1px dashed #000;
            border-radius: 8px;
            margin: 20px auto 0;
            :nth-child(2){
                margin-left: 8px;
            }
        }
        &.submit{
            width: 343px;
            height: 47px;
            font-size: 18px;
            line-height: 120%;
            font-weight: 700;
            color:#FFF;
            border-radius: 8px;
            background: #1A1A1A;
            margin: 0 auto;
            :nth-child(2){
                margin-left: 8px;
            }
            &:disabled{
                background: #C4C4C4;
            }
        }
    }
    .work-added{
        margin-top: 20px;
        font-weight: 700;
        font-size: 14px;
        span{
            color: #EA415A;
        }
    }
    .work-list{
        margin-top:16px;
        li{
            height: 56px;
            padding:0;
            border-radius: 10px;
            >i{
                width: 56px;
                height: 56px;
                border-radius: 10px;
            }
            p{
                margin-left: 12px;
                font-weight: 700;
                font-size: 14px;
            }
            >div{
                width: 40px;
                height: 40px;
                font-size: 16px;
                padding:12px;
            }
            &:nth-child(2),&:nth-child(n+3){
                margin-top: 10px;
            }
        }
    }
    .faq-list{
        li{
            margin-top:40px;
        }
        h4{
            font-weight: 700;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.75);
        }
        article{
            padding:8px 0 0;
            p{
                font-weight: 400;
                font-size: 15px;
                line-height: 140%;
                color: rgba(0, 0, 0, 0.75);
            }
        }
    }
    footer{
        box-sizing: content-box;
        text-align: center;
        height: 132px;
        padding-top:20px;
        padding-bottom: constant(safe-area-inset-bottom);/* iOS < 11.2 */
        padding-bottom: env(safe-area-inset-bottom);/* iOS >= 11.2 */
        h5{
            font-weight: 700;
            font-size: 14px;
        }
        p{
            font-weight: 400;
            font-size: 14px;
            margin-top:4px;
        }
    }
    .submit-box{
        box-sizing: content-box;
        position: fixed;
        z-index: 100;
        bottom:0;
        left:0;
        width: 100%;
        height: 59px;
        padding-top: 12px;
        background: #FFF;
        padding-bottom: constant(safe-area-inset-bottom);/* iOS < 11.2 */
        padding-bottom: env(safe-area-inset-bottom);/* iOS >= 11.2 */
        .loading{
            font-size: 1.2em;
            width: 1em;
            height:1em;
            opacity: .7;
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
    }
    .input-icon{
        .icon-box{
            font-size: 14px;
            top:21px;
            right:12px;
            transform: rotate(-90deg);
        }
    }

    :deep(.required-chart){
        position: relative;
        &::after{
            content: "";
            display: inline-block;
            width: .5em;
        }
        &::before{
            position: absolute;
            top:0;
            color:#EA415A;
            content: "*";
            font-style: normal;
            font-size: .8em;
        }
    }
}
</style>
