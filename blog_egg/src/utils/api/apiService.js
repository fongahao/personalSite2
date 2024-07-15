import axios from "axios"
import { APISSR } from "./apiConfig.js"

function getTypeInfo() {
    return axios(APISSR.getTypeInfo)
}

function getDetailById(id) {
    return axios(APISSR.getDetailById, {
        params: {
            id: id
        }
    })
}

function getArticleList() {
    return axios(APISSR.getArticleList)
}

function getArticleListByTag() {
    return axios(APISSR.getArticleListByTag)
}

function getArticleListByType(typeId) {
    return axios(APISSR.getArticleListByType, {
        params: {
            typeId: typeId
        }
    })
}

function getArticleListByTypeAndTag(typeId, tagId) {
    return axios(APISSR.getArticleListByTypeAndTag, {
        params: {
            typeId: typeId,
            tagId: tagId,
        }
    })
}

export {
    getTypeInfo,
    getDetailById,
    getArticleList,
    getArticleListByTag,
    getArticleListByType,
    getArticleListByTypeAndTag,
}