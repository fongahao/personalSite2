
// 中台的接口地址
// const host = 'http://127.0.0.1:8001/admin/';
// const host = 'http://127.0.0.1:8000/admin/';
// const host = 'http://www.fongahao.com:8001/admin/';

const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:9002' : ''
console.log(HOST, 'HOST地址', process.env.NODE_ENV)

const apiService = {
    checkLogin: `${HOST}/admin/checkLogin`,                    //  检查用户名密码是否正确
    getTypeInfo: `${HOST}/admin/getTypeInfo`,                  //  向中台获取文章类别信息
    addArticle: `${HOST}/admin/addArticle`,                    //  向中台发送数据库添加文章接口
    updateArticle: `${HOST}/admin/updateArticle`,              //  向中台发送数据库修改文章接口
    getArticleList: `${HOST}/admin/getArticleList`,            //  向中台获取文章列表
    delArticle: `${HOST}/admin/delArticle/`,                   //  向中台删除文章
    getArticleById: `${HOST}/admin/getArticleById/`,           //  向中台删除文章
}
export default apiService;