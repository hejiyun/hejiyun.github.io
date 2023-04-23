import {defineStore} from "pinia";
// import {POST} from "/utils/api.js";

export const useEvent = defineStore('event',{
    state: () => {
        return {
            // event_st   0：未开始 1：进行中  2：已结束
            // share_st ： 0：未分享  1：已分享  （活动结束） total页面
            // join_st ：0: 未参加  1:已参加 
            eventData: false,
            beat:0,
            voteNum: 0,
        };
    },
    getters:{
        // 类似于 computer
    },
    // actions:{
    //     storageEventData(data){
    //         // console.log(data)
    //         this.eventData = data?.data
    //     },
    //     updateHbSt(st){ // 更新hb是否滑完的状态
    //         this.hbState = st
    //     },
    // },
    
})
