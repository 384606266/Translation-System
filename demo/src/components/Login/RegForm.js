import {Button, Form, Icon, Input, message} from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import './login.css'
import axios from "axios";

const API_URL = "http://127.0.0.1:8080"

class NormalRegForm extends React.Component {
    // 补充注册函数
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            axios.post(API_URL + "/user/create/", "username=" + values.username + "&password=" + values.password).then((response) => {
                if (response.status === 200) {
                    message.success("创建用户成功");
                    window.location.reload();
                }
            }, (error) => {
                if (error.response.status === 409) {
                    message.error("该用户名已被注册");
                }
            })
        })

    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('输入的两次密码必须相同!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (<Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item hasFeedback>
                {getFieldDecorator('username', {
                    rules: [{required: true, message: '请输入您的用户名'}],
                })(<Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="用户名"
                />,)}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: '请输入您的密码！',
                    }, {
                        validator: this.checkConfirm,
                    }],
                })(<Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="密码"
                />,)}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('checkpassword', {
                    rules: [{
                        required: true, message: '请确认您的密码!',
                    }, {
                        validator: this.checkPassword,
                    }],
                })(<Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="确认密码"
                />,)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    确认
                </Button>
                <a href="#/login">登录</a>
            </Form.Item>
        </Form>);
    }
}

const RegForm = Form.create()(NormalRegForm);

export default RegForm;