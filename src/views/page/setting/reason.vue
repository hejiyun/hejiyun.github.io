<!-- CREATE by Hejiyun at 2022/8/10 15:15 -->
<template>
    <div class="Important-Reminder">
        <span class="title-text">{{$t("account.reason")}}</span>
        <div class="text-box">
            <div>
                <img v-if="!choseReason1" :class="language == 'zh-CN' ? 'mi-top' : ''"  src="@/assets/page-ui/chose-no.png" alt="" @click="chose(1)">
                <img v-else :class="language == 'zh-CN' ? 'mi-top' : ''" src="@/assets/page-ui/chose-is.png" alt="">
                <p :class="language == 'zh-CN' ? 'mt-top' : ''">{{$t("account.reason1")}} </p>
            </div>
            <div>
                <img v-if="!choseReason2"  src="@/assets/page-ui/chose-no.png" alt="" @click="chose(2)">
                <img v-else src="@/assets/page-ui/chose-is.png" alt="">
                <p>{{$t("account.reason2")}}</p>
            </div>
            <div>
                <img v-if="!choseReason3"  src="@/assets/page-ui/chose-no.png" alt="" @click="chose(3)">
                <img v-else src="@/assets/page-ui/chose-is.png" alt="" >
                <p>{{$t("account.reason3")}}</p>
            </div>
        </div>
        <div class="text1">
            <span class="title-text">{{$t("account.PhotoEvidence")}}</span>
        </div>
        <div class="pic-list">
            <div class="pic-item-box" v-for="(item, index) in picList"  :key="index">
                <img :src="item" alt="">
                <span class="del-image" @click="delImage(index)">×</span>
            </div>
            <div v-if="picList.length < 3" class="add-box" @click="uploadImag">
                ＋
            </div>
             <input v-show="false" id="upload" type="file"  accept="image/*"/>
        </div>
        <div class="helptips">
            <div v-if="!success && (choseReason1 || choseReason2 || choseReason3)" @click="Submit">{{$t("account.ReasonSubmit")}}</div>
            <div v-else class="not-click">{{success ? $t("account.Review")  : $t("account.ReasonSubmit")}}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive,nextTick, toRaw } from 'vue'
import {POST, PICUPLOAD} from "/utils/api"


const language = toRaw(window.navigator.language)
let blockRender = ref(false)
onMounted(()=>{
    nextTick(() => {
        setTimeout(() => {
            blockRender.value = true
        }, 100)
    })
})


const choseReason1 = ref(false)
const choseReason2 = ref(false)
const choseReason3 = ref(false)
const success = ref(false)

const chose = (num) => {
     num == 1 && (choseReason1.value = true, choseReason2.value = false,choseReason3.value = false)
     num == 2 && (choseReason2.value = true, choseReason1.value = false,choseReason3.value = false)
     num == 3 && (choseReason3.value = true, choseReason2.value = false,choseReason1.value = false)

}

const picList = reactive([])

// 删除当前图片

const  delImage = (index) => {
    picList.splice(index,1)
}


// 第一步, 获取上传图片的所有信息.
const uploadImag = () =>{
    let fil = document.querySelector('#upload') // 文件框，只不过隐藏了起来
    fil.click()
    //头像上传
    fil.addEventListener('change', function (e) {//注意，头像上传时用的时change事件
        const fd = new FormData()
        fd.append('file', e.target.files[0])
        PICUPLOAD(`/dev/art/upload/aws_file`,fd, {
            'USER-TOKEN' : sessionStorage.getItem('access_token'),
            'USER-PFID': sessionStorage.getItem('pfid'),
        }).then(res => {
            // 如果验证码错误, 同样提示, 并结束进程
            if (res.ret_code !== 0) return
            // 成功后, 保存对应信息,
                picList.push(res.data.playUrl)
        })
    })
}



const Submit= () => {
    const str = ref('')
    choseReason1.value && (str.value = language == 'zh-CN' ? '有多個賬號/想要註冊新賬號' : 'Have multiple accounts/want to register a new account')
    choseReason2.value && (str.value = language == 'zh-CN' ? '不想用了' : "Don't want to use")
    choseReason3.value && (str.value = language == 'zh-CN' ? '其他原因' : 'Other reason')
    // 首先需要验证验证码是否正确, 正确则进入下一页, 不正确则提示验证码错误.
    POST(`/test/art/user/del_account`,{
        tmp_code: sessionStorage.getItem('tmp_auth_code'),
        reason: str.value,
        image: [...toRaw(picList)]
    }, {
        'USER-TOKEN' : sessionStorage.getItem('access_token'),
        'USER-PFID': sessionStorage.getItem('pfid')
    }).then(res => {
        // 如果验证码错误, 同样提示, 并结束进程
        if (res.ret_code !== 0) return
        // 提示成功并跳转登录.
        success.value = true
    })
}

</script>

<style lang="scss" scoped>
.Important-Reminder {
   position: relative;
   padding-top:1rem;
   height: 100vh;
}
.title-text{
    position: relative;
    font-size: .64rem;
    font-weight: 900;
    &::before{
        content: '*';
        position: absolute;
        top:-.1rem;
        right: -.35rem;
        color:red;
    }
}
.text-box{
    margin-top:.64rem;
    >div{
        display: flex;
        justify-content: flex-start;
        margin-bottom: .693rem;
        img{
            width: .464rem;
            height: .464rem;
            margin-right: .4477rem;
        }
        p{
            font-size: .373rem;
        }
        .mt-top{
            line-height: .6rem;
        }
        .mi-top{
            margin-top:.1rem
        }
    }
    >div:nth-last-child(1) {
        margin-bottom: 0;
    }
}
.next-page-box{
    position: absolute;
    bottom:1.12rem;
    right:0;
    border-radius: 50%;
    >div{
        position: relative;
        display: flex;
        justify-content: center;
        span{
            position: absolute;
            top:.533rem;
            width: 1.36rem;
            height: 1.36rem;
            display: block;
            border-radius: 50%;
        }
    }
}
.text1{
    margin-top:.96rem;
    .title-text{
        &::before{
            display: none;
        }
    }
}
.helptips{
    position: absolute;
    bottom:.6rem;
    width: 100%;
    color:white;
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 1.2266rem;
        background: linear-gradient(285.86deg, #3BDECD 13.63%, #F365AC 84.85%);
        border-radius: 8px;
        font-size: .48rem;
    }
    .not-click{
        background: #C4C4C4;
    }

}
.pic-list{
    margin-top:.426rem;
    display: flex;
    justify-content: space-between;
    &::after{
        content:'';
        width: 2.82rem;
    }
    .pic-item-box{
        position: relative;
        width: 2.82rem;
        height: 2.82rem;
        background: #999;
        border-radius: 10px;
    }
    .add-box{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .48rem;
        width: 2.82rem;
        height: 2.82rem;
        border: 1px dashed #C4C4C4;
        border-radius: 10px;
    }
    .del-image{
        position: absolute;
        top:.1rem;
        right:0.1rem;
        display: block;
        text-align: center;
        line-height: .4266rem;
        font-size:.373rem ;
        width: .4266rem;
        height: .4266rem;
        color:#ffff;
        background: #000000;
        border-radius: 50%;
    }
}
</style>
