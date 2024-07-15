const ENV = process.env.NODE_ENV
// APISSR 是服务端渲染时需要调用的接口（数据预取）
// 数据预取的时，在docker 服务内部发起请求，所以接口路径是这样的
const SSRHOST = `http://127.0.0.1:9002/blog/api/`
// const apiService = {
const APISSR = {
    getTypeInfo: `${SSRHOST}getTypeInfo`,
    getDetailById: `${SSRHOST}getDetailById`,
    getArticleList: `${SSRHOST}getArticleList`, 
    getArticleListByTag: `${SSRHOST}getArticleListByTag`,
    getArticleListByType: `${SSRHOST}getArticleListByType`,
    getArticleListByTypeAndTag: `${SSRHOST}getArticleListByTypeAndTag`, // 数据预取
}


// 部署和开发时，正常接口请求是不一样的
let HOST;
let API;

if (ENV === "production") {
    // apiUrl = `www.fongahao.com/blog/api`
    API = {
        getArticleListByType: `blog/api/getArticleListByType`,
        getArticleListByTypeAndTag: `blog/api/getArticleListByTypeAndTag`,
    }
} else {
    HOST = `http://127.0.0.1:9002/blog/api/`
    API = {
        getArticleListByType: `${HOST}getArticleListByType`,
        getArticleListByTypeAndTag: `${HOST}getArticleListByTypeAndTag`, // 数据预取
    }
}


console.log('配置环境', ENV, SSRHOST, HOST)



export { APISSR, API }