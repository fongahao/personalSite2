import React, { useState, useEffect } from 'react';
import '../static/css/ArticleList.css';
import {
    List, Row, Col, Modal, message, Button,
} from 'antd';
import axios from 'axios';
import apiService from '../config/apiUrl';
const { confirm } = Modal;

const ArticleList = (props) => {

    const [list, setList] = useState([])

    // useEffect hook 告诉 React 组件需要在渲染后执行某些操作，
    // 传给 useEffect 的函数会在浏览器完成布局与绘制之后，在一个延迟事件中被调用。
    useEffect(() => {
        getList()
    }, [])

    // 获取文章列表
    const getList = () => {
        axios({
            method: 'get',
            url: apiService.getArticleList,
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }

    // 删除文章
    const delArticle = (id) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮, 文章将会永远被删除, 无法恢复。',
            onOk() {
                axios(apiService.delArticle + id, {
                    withCredentials: true,
                }).then(
                    (res) => {
                        message.success('文章删除成功');
                        getList();
                    }
                )
            },
            onCancel() {
                message.success('没有任何变化')
            }
        })
    }

    // 修改文章
    const updateArticle = (id, checked) => {

        props.history.push('/index/add/' + id)

    }

    // 视图
    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={5}>
                            <b>标题</b>
                        </Col>
                        <Col span={5}>
                            <b>类别</b>
                        </Col>
                        <Col span={5}>
                            <b>标签</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={5}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={5}>
                                <div>{item.title}</div>
                            </Col>
                            <Col span={5}>
                                <div>{item.typeName}</div>
                            </Col>
                            <Col span={5}>
                                <div>{item.tagName}</div>
                            </Col>
                            <Col span={4}>
                                <div>{item.addTime}</div>
                            </Col>
                            <Col span={5}>
                                <Button type="primary" onClick={() => { updateArticle(item.id) }}>修改</Button>&nbsp;
                                <Button onClick={() => { delArticle(item.id) }}>删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList