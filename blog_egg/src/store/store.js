import Vue from 'vue'
import Vuex from 'vuex'
import {
    getDetailById,
    getArticleList,
    getArticleListByTypeAndTag,
    // getTypeInfo,
    // getArticleListByTag,
    // getArticleListByType,
} from '../utils/api/apiService.js'

Vue.use(Vuex)


// 数据存储
const state = {
    articleList: '',
    articleDetails: '',
    articleListByTypeAndTag: '',
    // typeInfo: '',
    // articleListByTag: '',
    // articleListByType: '',
}

// 过滤
const getters = {}

// 分发，异步
const actions = {
    // 直接用 axios，这是因为数据预取是在Vue实例化之前
    fetchArticleList({ commit }) {
        return getArticleList().then(res => {
            console.log('客户端:获取文章列表', res.data)
            commit('SET_ARTICLE_LIST', res.data)
        })
    },
    fetchDetailData({ commit }, id) {
        return getDetailById(id).then(res => {
            console.log('客户端:获取文章详情', res.data[0])
            commit('SET_DETAIL_DATA', res.data[0])
        })
    },
    fetchArticleListByTypeAndTag(
        { commit },
        { typeId, tagId }
    ) {
        return getArticleListByTypeAndTag(typeId, tagId).then(res => {
            console.log('客户端:通过文章类型和标签获取文章列表', res.data)
            commit('SET_ARTICALELIST_BY_TYPEANDTAG', res.data)
        })
    }
    // fetchTypeInfo({ commit }) {
    //     return getTypeInfo().then(res => {
    //         console.log('客户端:获取分类信息', res.data)
    //         commit('SET_ARTICLE_LIST', res.data)
    //     })
    // },
    // fetchArticleList({ commit }) {
    //     return getArticleList().then(res => {
    //         console.log('客户端:获取文章列表', res.data)
    //         commit('SET_ARTICLE_LIST', res.data)
    //     })
    // },
    // fetchArticleListByTag({ commit }) {
    //     return getArticleListByTag().then(res => {
    //         commit('SET_ARTICALELIST_BYTAG', res.data)
    //     })
    // },
    // fetchArticleListByType({ commit }, typeId) {
    //     return getArticleListByType(typeId).then(res => {
    //         console.log('客户端:通过文章类型获取文章列表', res.data)
    //         commit('SET_ARTICALELIST_BYTYPE', res.data)
    //     })
    // },
}

// 提交状态变化
const mutations = {
    SET_ARTICLE_LIST(state, articleList) {
        state.articleList = articleList
    },
    SET_DETAIL_DATA(state, articleDetails) {
        state.articleDetails = articleDetails
    },
    SET_ARTICALELIST_BY_TYPEANDTAG(state, articleListByTypeAndTag) {
        state.articleListByTypeAndTag = articleListByTypeAndTag
    }
    // SET_TYPE_INFO(state, typeInfo) {
    //     state.typeInfo = typeInfo
    // },
    // SET_ARTICALELIST_BYTAG(state, articleListByTag) {
    //     state.articleListByTag = articleListByTag
    // },
    // SET_ARTICALELIST_BYTYPE(state, articleListByType) {
    //     state.articleListByType = articleListByType
    // },
}

export default function createStore() {
    return new Vuex.Store({
        state,
        getters,
        mutations,
        actions,
    })
}