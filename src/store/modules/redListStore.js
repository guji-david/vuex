// 这里定义初始值
import Vue from 'vue'
import store from '../store.js'
import * as API from '../api.js'

let state = {
    tableData:[]
};

const mutations = {
    SET_REDPACKET_LIST: (state, {res}) => {
        state.tableData=res.list;
    }
};

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {
    GET_REDPACKET_LIST: ({commit,dispatch,state}, {pageNo, pageSize, redpacketName}) => {
        return API.$queryRedpacket(pageNo, pageSize, redpacketName,res=>{
            commit('SET_REDPACKET_LIST', {
                res:res
            })
        },function () {
            error => console.log(error)
        })
    }
};

// 返回改变后的数值
const getters = {
    /**
     * 获取当前缓存的产品列表
     */
    tableData(state, getters) {
        const {tableData} = state
        return state.tableData;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}