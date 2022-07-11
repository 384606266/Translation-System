import {Button, Checkbox, Form, Icon, Input, message} from 'antd';
import React from 'react';
import {history} from "../../utils/history";
import 'antd/dist/antd.css';
import './login.css'
import AuthService from "./AuthService";

class NormalRegForm extends React.Component {
    //补充注册函数
    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             AuthService.login(values.username, values.password).then(() => {
    //                 message.success("登录成功！", 1)
    //                 history.push('#/')
    //                 window.location.reload()
    //             }, error => {
    //                 const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    //                 message.error(resMessage, 1)
    //             })
    //         }
    //     });

    // };

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
          form.validateFields(['confirm'], { force: true });
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