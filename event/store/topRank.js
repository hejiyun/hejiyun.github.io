import {defineStore} from "pinia";

export const useRankStore = defineStore('topRank',{
    state: () => {
        return {
            listData: null,//用来存储list
            dayData: 0 //当前的title日期
        };
    },
    getters:{
        // 类似于 computer
    },
    actions:{
         //action内定义的是方法函数(methods)
        setTopRankList(item) {
            if (!this.listData) this.listData = item;
            else this.listData = { ...this.listData, ...item };
            // console.log(this.listData, "save");
        },
    },
     // 开启数据缓存
    persist: {
        //这里存储默认使用的是session
        enabled: true,
        strategies: [
            {
                //key的名称
                key: "ax_rank",
                //更改默认存储为localStorage
                storage: localStorage,
                // 设置存储key
                // paths: ['list']
            },
        ],
    },
})
