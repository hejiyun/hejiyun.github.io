<template>
    <div class="invitation">
        <div class="first-wrapper">
            <div class="card-box">
                <p>Artist Invitation Code</p>
                <i class="line"></i>
                <p>
                    <span>{{inviteData.code.code}}</span>
                    <i @click="copyID(inviteData.code.code)">
                        <ax-icon class="icon-copy"></ax-icon>
                    </i>
                </p>
                <p><span>{{inviteData.code.max_times}}</span> people can be invited</p>
                <p><span>{{inviteData.code.used_times}}</span> times used</p>
            </div>
            <ul v-if="winWidth > 768" class="list-box">
                <li>
                    <span>date</span>
                    <span>Invited man</span>
                    <span>Status</span>
                    <span>rewards</span>
                </li>

                <template v-if="inviteData.list">
                    <li v-for="(d, i) in inviteData.list" :key="i">
                        <span>{{ d.datetime.substring(0,10)}}</span>
                        <span>{{ d.nickname }}</span>
                        <span>{{ ['No Use','Registed','Joined'][~~d.op_st] }}</span>
                        <span :class="{'text-red' : ~~d.reward_num}">
                        {{ d.reward_num }} {{['','Canvas','Canvas','Canvas','Beats','ArtX'][d.reward_num]}}
                    </span>
                    </li>
                </template>
            </ul>
            <div v-else class="list-box-mob">
                <p class="list-box-mob-title">record</p>
                <p class="list-box-mob-year" v-if="inviteData.list && inviteData.list.length">{{inviteData.list[0].datetime.substring(0,4)}}</p>
                <i></i>
                <ul>
                    <li v-for="(d, i) in inviteData.list" :key="i">
                        <div>
                            <p>{{ d.datetime.substring(8,10) }}</p>
                            <p>{{ monthName[~~d.datetime.substring(5,7)]}}</p>
                        </div>
                        <div>
                            <p>{{ d.nickname }}</p>
                            <p>{{ ['No Use','Registed','Joined'][~~d.op_st] }}</p>
                        </div>
                        <div :class="{'text-red' : ~~d.reward_num}">
                            {{ d.reward_num }} {{['','Canvas','Canvas','Canvas','HNX','HTX'][d.reward_num]}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <page-footer></page-footer>
    </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import PageFooter from "@/views/components/page-footer.vue";
import AxIcon from "@/components/ax-dom/ax-icon.vue";
import copy from "../../../../utils/clipboard";
import {POST} from "../../../../utils/api.js";
import {useUserStore} from "@/store/user.js";
const userStore = useUserStore();
const copyID = (text) => {
    copy(text, () => {
        window.toast("Copy succeeded");
    });
};
const winWidth = ref("");
if (window.innerWidth) winWidth.value = window.innerWidth;
else if (document.body && document.body.clientWidth)
    winWidth.value = document.body.clientWidth;

window.onresize = function () {
    if (window.innerWidth) winWidth.value = window.innerWidth;
    else if (document.body && document.body.clientWidth)
        winWidth.value = document.body.clientWidth;
};
const monthName=ref(['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']);
const splitMonth = (d, i) => new Date(d).toString().split(" ")[i];
const inviteData = reactive({
    list:[],
    code:{}
});
const getInviteList = () => {
    POST(`${window.api.api}/web/user/invite_info`,null,{
        "USER-PFID":userStore.userinfo.pfid,
        "USER-TOKEN":userStore.userinfo.access_token
    }).then(res=>{
        if(res.ret_code === 0){
            res.data.invite_users && (inviteData.list = res.data.invite_users)
            res.data.invite_code && (inviteData.code = {...res.data.invite_code})
        }
    })
}
getInviteList()
</script>

<style lang="scss" scoped>
.invitation {
    font-style: italic;

    .first-wrapper {
        width: 100vw;
        background: url("@/assets/images/page-bg/color-light-b.jpg") no-repeat center center/cover;
        padding-top: 123px;
        position: relative;
        z-index: 2;

        .card-box {
            overflow: hidden;
            width: 1140px;
            height: 325px;
            margin: 0 auto;
            background: url("@/assets/images/invitation-bg.png") no-repeat
                center center/cover;

            p {
                text-align: center;
            }

            p:nth-of-type(1) {
                font-weight: 900;
                font-size: 45px;
                line-height: 57px;
                text-transform: capitalize;
                color: rgba(0, 0, 0, 0.75);
                margin-top: 43px;
            }
            .line {
                display: block;
                margin: 20px 38px 0;
                height: 1px;
                background: #e0e0e0;
            }
            p:nth-of-type(2) {
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 32px;
                span {
                    font-weight: 900;
                    font-size: 45px;
                    line-height: 120%;
                    text-transform: capitalize;
                    background: linear-gradient(
                        90deg,
                        #f365ac 9.19%,
                        #3bdecd 87.87%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
                i {
                    margin-left: 9px;
                    color: #9a9a9a;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                }
            }
            p:nth-of-type(3) {
                margin-top: 25px;
            }
            p:nth-of-type(3),
            p:nth-of-type(4) {
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 160%;
                text-align: center;
                color: #000000;
                span {
                    font-weight: 900;
                    font-style: italic;
                }
            }
        }
        .list-box {
            max-width: 914px;
            margin: 150px auto;
            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 160%;
                text-align: center;
                color: #000000;
                margin-bottom: 20px;
                span {
                    display: block;
                    width: 25%;
                    text-align: center;
                }
                .text-red {
                    font-style: italic;
                    font-weight: 800;
                    font-size: 20px;
                    line-height: 160%;
                    text-transform: capitalize;
                    color: #f365ac;
                    &:before{
                        content: "+";
                    }
                }
            }
            li:first-of-type {
                font-weight: 800;
                font-size: 24px;
                line-height: 120%;
                text-transform: capitalize;
                color: rgba(0, 0, 0, 0.75);
            }
        }
    }
}
@media only screen and (max-width: 1200px) {
    .invitation {
        .first-wrapper {
            .card-box {
                width: 912px;
                height: 260px;
                p:nth-of-type(1) {
                    margin-top: 28px;
                }
                .line {
                    margin: 13px 30.4px 0;
                }
                p:nth-of-type(2) {
                    margin-top: 16px;
                }
                p:nth-of-type(3) {
                    margin-top: 12px;
                }
            }
        }
    }
}
@media only screen and (max-width: 1024px) {
    .invitation {
        .first-wrapper {
            .card-box {
                width: 798px;
                height: 227.5px;
                p:nth-of-type(1) {
                    margin-top: 20px;
                    font-size: 40px;
                }
                .line {
                    margin: 8px 30.4px 0;
                }
                p:nth-of-type(2) {
                    margin-top: 12px;
                    span {
                        font-size: 40px;
                    }
                    i {
                        width: 25px;
                        height: 25px;
                    }
                }
                p:nth-of-type(3) {
                    margin-top: 8px;
                }
                p:nth-of-type(3),
                p:nth-of-type(4) {
                    font-size: 16px;
                }
            }
            .list-box {
                max-width: 750px;
                margin: 100px auto;
            }
        }
    }
}
@media only screen and (max-width: 768px) {
    .invitation {
        .first-wrapper {
            .card-box {
                width: 334px;
                height: 229px;
                background: url("@/assets/images/invitation-bg-mob.png")
                    no-repeat center center/cover;
                p:nth-of-type(1) {
                    margin-top: 20px;
                    font-size: 24px;
                    line-height: 37px;
                    text-align: center;
                    background: linear-gradient(
                        180deg,
                        #000000 0%,
                        #757575 113.64%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
                .line {
                    margin: 22px 39px 0;
                }
                p:nth-of-type(2) {
                    margin-top: 12px;
                    span {
                        font-size: 24px;
                        line-height: 37px;
                    }
                    i {
                        width: 14px;
                        height: 14px;
                        margin-left: 7px;
                    }
                }
                p:nth-of-type(3) {
                    margin-top: 3px;
                }
                p:nth-of-type(3),
                p:nth-of-type(4) {
                    font-size: 15px;
                    span {
                        font-size: 20px;
                    }
                }
            }
            .list-box-mob {
                margin: 76px 21px;
                &-title {
                    font-weight: 900;
                    font-size: 32px;
                    line-height: 37px;
                    text-align: center;
                    text-transform: capitalize;
                    background: linear-gradient(
                        180deg,
                        #000000 0%,
                        #757575 113.64%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
                &-year {
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 160%;
                    color: #000000;
                    margin-top: 16px;
                }
                i {
                    display: block;
                    width: 100%;
                    height: 1px;
                    background: #e0e0e0;
                    margin: 15px 0 20px;
                }
                ul {
                    li {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 21px;
                        font-style: normal;

                        div:nth-of-type(1) {
                            p:first-of-type {
                                font-weight: 700;
                                font-size: 15px;
                                line-height: 120%;
                                text-align: center;
                                color: rgba(0, 0, 0, 0.75);
                            }
                            p:last-of-type {
                                font-weight: 400;
                                font-size: 12px;
                                line-height: 160%;
                                text-transform: capitalize;
                                color: #000000;
                            }
                        }
                        div:nth-of-type(2) {
                            width: 150px;
                            p:first-of-type {
                                font-weight: 700;
                                font-size: 15px;
                                line-height: 160%;
                                color: #000000;
                            }
                            p:last-of-type {
                                font-weight: 400;
                                font-size: 12px;
                                line-height: 160%;
                                color: #000000;
                            }
                        }
                        div:nth-of-type(3) {
                            width: 83.75px;
                            height: 39px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 400;
                            font-size: 15px;
                            line-height: 160%;
                            color: #000000;
                        }
                        .text-red {
                            background: rgba(243, 101, 172, 0.1);
                            border-radius: 8px;
                            font-style: italic;
                            font-weight: 800 !important;
                            color: #f365ac !important;
                        }
                    }
                }
            }
        }
    }
}
</style>
