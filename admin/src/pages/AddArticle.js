import React, { useState, useEffect } from 'react';
import marked from 'marked';
import '../static/css/AddArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import apiService from '../config/apiUrl';
import typeJson from '../static/json/type.json'

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = (props) => {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContentMd, setArticleContentMd] = useState('')  //markdown的编辑内容
    const [articleContentHtml, setArticleContentHtml] = useState('') //html内容
    const [introduceMd, setIntroduceMd] = useState()            //简介的markdown内容
    const [introduceHtml, setIntroduceHtml] = useState('') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    // const [updateDate, setUpdateDate] = useState() //修改日志的日期
    // const [typeInfo, setTypeInfo] = useState(typeJson) // 文章类别信息
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('0') //选择的文章类别
    const [selectedTag, setSelectTag] = useState('0') //选择的文章类别
    // const [tagInfo, setTagInfo] = useState(typeInfo[selectedType].tagInfo) // 文章标签信息
    const [tagInfo, setTagInfo] = useState([]) // 文章标签信息


    //  useEffect hook 告诉 React 组件需要在渲染后执行某些操作,
    //  传给 useEffect 的函数会在浏览器完成布局与绘制之后，在一个延迟事件中被调用。
    useEffect(() => {
        setTypeInfo(typeJson)
        setTagInfo(typeJson[selectedType].tagInfo)
        // getTypeInfo();
        let tmpId = props.match.params.id;
        if (tmpId) {
            setArticleId(tmpId);
            getArticleById(tmpId);
        }
    }, [])

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })

    const changeContent = (e) => {
        setArticleContentMd(e.target.value);
        let html = marked(e.target.value);
        setArticleContentHtml(html);
    }

    const changeIntroduce = (e) => {
        setIntroduceMd(e.target.value);
        let html = marked(e.target.value);
        setIntroduceHtml(html);
    }

    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: apiService.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true,
        }).then(
            (res) => {
                console.log('AddAticle组件:', '\n', '向中台请求文章分类报文体:', res.request, '\n', '文章分类数据:', res.data);
                if (res.data.data === "没有登录") {
                    localStorage.removeItem('openId');
                    props.history.push('/');
                } else {
                    setTypeInfo(res.data.data);
                }
            }
        )
    }

    const selectTypeHandler = (value) => {
        setSelectType(value);
        setTagInfo(typeInfo[value].tagInfo)
        setSelectTag(typeInfo[value].tagInfo[0].id)
        console.log(
            '文章类型选择',
            value, '\n',
            '文章标签信息',
            typeInfo[value].tagInfo,
            typeInfo[value].tagInfo[0].id
        )
    }

    const selectTagHandler = (value) => {
        setSelectTag(value)
        console.log('selectedTag', value)
    }

    const getArticleById = (id) => {
        axios(apiService.getArticleById + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            (res) => {
                //let articleInfo= res.data.data[0]
                console.log('获取文章详情接口:', res.data.data[0])
                setArticleTitle(res.data.data[0].title)
                setArticleContentMd(res.data.data[0].article_content)
                let html = marked(res.data.data[0].article_content)
                setArticleContentHtml(html)
                setIntroduceMd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroduceHtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId.toString())
                setTagInfo(typeJson[res.data.data[0].typeId].tagInfo)
                setSelectTag(res.data.data[0].tagId.toString())
                console.log('在同步函数中访问的state都是旧值', selectedType, selectedTag)

            }
        )
    }

    const saveArticle = () => {

        // markedContent()
        if (!selectedType) {
            message.error('请选择文章类别');
            return false;
        } else if (!selectedTag) {
            message.error('文章标签不能为空');
            return false;
        } else if (!articleTitle) {
            message.error('文章名称不能为空');
            return false;
        } else if (!articleContentMd) {
            message.error('文章内容不能为空');
            return false;
        } else if (!introduceMd) {
            message.error('文章简介不能为空');
            return false;
        } else if (!showDate) {
            message.error('文章发布时间不能为空');
            return false
        }

        const dataProps = {};
        dataProps.type_id = selectedType;
        dataProps.tag_id = selectedTag;
        dataProps.title = articleTitle;
        dataProps.article_content = articleContentMd;
        dataProps.introduce = introduceMd;
        console.log('发布日期showDate', showDate)
        const datetext = showDate.replace(/-/g, '/'); // 把字符串转成时间戳
        console.log('发布日期datetext', datetext)
        dataProps.addTime = (new Date(datetext).getTime()) / 1000;
        console.log('文章数据', dataProps)
      
        console.log('添加文章内容', dataProps)
        console.log(articleId, '文章的ID')

        if (articleId === 0) {

            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: apiService.addArticle,
                data: dataProps,
                withCredentials: true,
            }).then(
                (res) => {
                    console.log(res.data, 'resData走到了添加文章')
                    setArticleId(res.data.insertId)
                    if (res.data.isSuccess) {
                        message.success('文章添加成功')
                    } else {
                        message.error('文章添加失败');
                    }
                }
            )
        } else {
            console.log('走到了更新文章');
            dataProps.id = articleId;
            axios({
                method: 'post',
                url: apiService.updateArticle,
                headers: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true,
            }).then(
                (res) => {
                    console.log(res.data, 'resData走到了更新文章')
                    if (res.data.isSuccess) {
                        message.success('文章更新成功');
                    } else {
                        message.error('文章更新失败')
                    }
                }
            )
        }
    }

    // 视图
    return (
        <div>
            {/* 第一行 */}
            <Row justify="space-between"
            >

                {/* 文章类别 */}
                <Col span={4}>
                    <Select value={selectedType} size="large" onChange={selectTypeHandler}>
                        {
                            typeInfo.map((item, index) => {
                                return (<Option key={index} value={item.id}>{item.name}</Option>)
                            })
                        }
                    </Select>
                    <Select value={selectedTag} size="large" onChange={selectTagHandler}>
                        {
                            tagInfo.map((item, index) => {
                                return (<Option key={index} value={item.id}>{item.name}</Option>)
                            })
                        }
                    </Select>
                </Col>

                {/* 文章标题 */}
                <Col span={8}>
                    <Input
                        value={articleTitle}
                        onChange={(e) => {
                            setArticleTitle(e.target.value)
                        }}
                        placeholder="博客标题"
                        size="large" />
                </Col>

                {/* 发布日期 */}
                <Col span={4}>
                    <div className="date-select">
                        <DatePicker
                            onChange={(date, dateString) => setShowDate(dateString)}
                            placeholder="发布日期"
                            size="large"
                        />
                    </div>
                </Col>

                {/* 发布文章按钮 */}
                <Col span={4} >
                    {/* <Button size="large" onClick={'占位符'}>暂存文章</Button>&nbsp; */}
                    <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                    {/* <br /> */}
                </Col>
            </Row>
            {/* 第二行 */}
            <Row justify="space-between">
                <Col span={12} >
                    {/* <br /> */}
                    <TextArea
                        value={introduceMd}
                        onChange={changeIntroduce}
                        onPressEnter={changeIntroduce}
                        rows={4}
                        placeholder="文章简介"
                    ></TextArea>

                </Col>

                <Col span={12} >
                    <div
                        className="introduce-html"
                        dangerouslySetInnerHTML={{ __html: `文章简介${introduceHtml}` }}
                    ></div>
                </Col>
            </Row>
            {/* 第三行 */}
            <Row gutter={5}>
                {/* 下面 */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {/* <Row gutter={10} >


                    </Row> */}
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                value={articleContentMd}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: `文章内容${articleContentHtml}` }}
                            >
                            </div>

                        </Col>
                    </Row>
                </Col>



            </Row>
        </div>
    )
}

export default AddArticle;