import React, { 
    useState, useEffect, 
    // createContext 
} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import '../static/css/Login.css';
import { SmileOutlined } from '@ant-design/icons';
import apiService from '../config/apiUrl';
import axios from 'axios';
// const openIdContext = createContext();

const Login = (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

    })
    const checkLogin = () => {

        setIsLoading(true);
        if (!userName) {
            message.error('用户名不能为空');
            return false;
        } else if (!password) {
            message.error('密码不能为空');
            return false;
        }

        const dataProps = {
            'userName': userName,
            'password': password,
        }
        axios({
            method: 'post',
            url: apiService.checkLogin,
            // headers: { 'content-type': 'application/x-www-form-urlencoded' },
            // data: { ...dataProps },
            data: dataProps,
            withCredentials: true,
        }).then(
            (res) => {
                console.log('这里是前台登录页面');
                console.log('Login页面:', '\n', '中台返回数据', res.data);
                setIsLoading(false);
                if (res.data.data === '登录成功') {
                    localStorage.setItem('openId', res.data.openId);
                    console.log('localStorage', localStorage);
                    props.history.push('/index');
                    console.log('props', props);
                } else {
                    message.error('用户密码错误！');
                }
            }
        )

        // setTimeout(() => {
        //     setIsLoading(false)
        // }, 1000)
    };

    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Fongahao Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<SmileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<SmileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login;