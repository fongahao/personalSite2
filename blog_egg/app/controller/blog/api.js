'use strict';

const Controller = require('egg').Controller;


class apiController extends Controller {
    // 文章详情页 - 文章详情
    async getDetailById() {
        const { ctx } = this;
        const query = ctx.query
        console.log('api接口url以及参数', ctx.url, query)
        const id = query.id

        const sql = `SELECT article.id as id,
              article.title as title,
              article.introduce as introduce,
              article.article_content as article_content,
              FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
              article.tag_id as tagId,
              type.typeName as typeName,
              type.id as typeId
              FROM article LEFT JOIN type ON article.type_id = type.id
              WHERE article.id=${id};`

        const result = await this.app.mysql.query(sql)
        result && (ctx.body = result)

    }

    // 首页 - 获取文章列表
    async getArticleList() {
        const sql = `SELECT article.id AS id,
               article.type_id AS typeId,
               article.tag_id AS tagId,
               article.title AS title,
               article.introduce AS introduce,
               FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) AS addTime,
               type.typeName AS typeName,
               tag.tagName AS tagName
               FROM (article LEFT JOIN type ON article.type_id = type.id)
               LEFT JOIN tag ON article.tag_id = tag.id
               ORDER BY article.addTime DESC LIMIT 10;`

        const result = await this.app.mysql.query(sql);
        // console.log('getArticleList', result);
        this.ctx.body = result;

    }

    // 根据文章类型获取文章列表
    async getArticleListByType() {

        const { ctx } = this
        const { typeId } = ctx.query
        console.log('根据文章类型获取文章列表', ctx.url, ctx.query)

        const sql = `SELECT article.id AS id,
            article.title AS title,
            article.introduce AS introduce,
            article.type_id AS typeId,
            article.tag_id AS tagId,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) AS addTime,
            type.typeName AS typeName,
            tag.tagName AS tagName
            FROM (article LEFT JOIN type ON article.type_id = type.id)
            LEFT JOIN tag ON article.tag_id = tag.id
            WHERE article.type_id=${typeId};`

        const result = await this.app.mysql.query(sql);
        // console.log('服务器端getArticleListByType', result);
        this.ctx.body = result;

    }

    // 获取后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type');
        this.ctx.body = { data: resType };
    }

    async getArticleListByTypeAndTag() {

        const { ctx } = this;
        const { typeId, tagId } = ctx.query
        let sql = undefined
        console.log(
            'getArticleByTypeAndTag服务器端参数',
            typeId,
            tagId,
            typeof (typeId)
        )

        if (typeId && tagId) {
            sql = `SELECT article.id as id,
            article.type_id as typeId,
            article.tag_id as tagId,
            article.title as title,
            article.introduce as introduce,
            article.article_content as article_content,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
            type.typeName as typeName,
            tag.tagName as tagName
            FROM (article LEFT JOIN type ON article.type_id = type.id)
            LEFT JOIN tag ON article.tag_id = tag.id
            WHERE article.type_id = ${typeId} AND article.tag_id = ${tagId};`
        } else {
            sql = `SELECT article.id as id,
            article.type_id as typeId,
            article.tag_id as tagId,
            article.title as title,
            article.introduce as introduce,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
            type.typeName as typeName,
            tag.tagName as tagName
            FROM (article LEFT JOIN type ON article.type_id = type.id)
            LEFT JOIN tag ON article.tag_id = tag.id;`
        }


        const result = await this.app.mysql.query(sql)
        // console.log('根据分类和标签返回文章:', result)
        this.ctx.body = result;
    }

    // async getArticleListByType() {
    //     const { ctx } = this;

    // }
}

module.exports = apiController 