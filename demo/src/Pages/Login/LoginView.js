import React, { Fragment } from 'react';
import LoginForm from '../../components/Login/LoginForm';


class LoginView extends React.Component{
    render(){
        return(
            <Fragment>
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">登录</h1>
                        <div className="login-content">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        );

    }
}

export default LoginView;