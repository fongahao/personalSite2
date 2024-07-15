'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
    const { router, controller } = app;
    // const gzip = app.middleware.gzip({ threshold: 1024 });

    /* blog 服务端渲染html请求 */
    router.get('/', controller.blog.indexSsr.initialize);
    router.get('/detail', controller.blog.detailSsr.initialize);
    router.get('/articleList', controller.blog.articleListSsr.initialize);
    router.get('/about', controller.blog.aboutSsr.initialize);


    /* blog 数据预取 */
    router.get('/blog/api/getTypeInfo', controller.blog.api.getTypeInfo);
    router.get('/blog/api/getDetailById', controller.blog.api.getDetailById);
    router.get('/blog/api/getArticleList', controller.blog.api.getArticleList);
    router.get('/blog/api/getArticleListByType', controller.blog.api.getArticleListByType);
    router.get('/blog/api/getArticleListByTypeAndTag', controller.blog.api.getArticleListByTypeAndTag);

}