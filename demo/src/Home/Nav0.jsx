import React from 'react';
import {findDOMNode} from 'react-dom';
import TweenOne from 'rc-tween-one';
import {Button, Card, Col, Icon, Menu, Popover, Row} from 'antd';
import {Link} from "react-router-dom";

const Item = Menu.Item;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneOpen: false,
            menuHeight: 0,
            isLogin: false,
            viewRegAndLog: '',
            viewPersonal: 'none',
            username: '',    //用户名
            mycost: '',  //积分
        };

        /*
        需要实现一个功能，从后台获取用户当前登录状态
        若用户已登录，则将viewPersonal设为''，viewRegAndLog设为'none',并补充username和mycost信息
        若用户未登录，不改变state中的状态
        */
    }

    /*
    点击登出按钮时触发，调用后端接口
    将viewRegAndLog设为''，viewPersonal设为'none'，清空username和mycost信息，也可直接刷新页面？
    */
    logOut = () => {

    };

    phoneClick = () => {
        const menu = findDOMNode(this.menu);
        const phoneOpen = !this.state.phoneOpen;
        this.setState({
            phoneOpen,
            menuHeight: phoneOpen ? menu.scrollHeight : 0,
        });
    };

    render() {
        const {...props} = this.props;
        const {dataSource, isMobile} = props;
        delete props.dataSource;
        delete props.isMobile;
        const {menuHeight, phoneOpen} = this.state;
        //个人页面
        const content = [
            <Card style={{height: '180px', width: '250px', textAlign: 'left'}}>
                <Row style={{height: '50px'}}>
                    <Col span={4}>
                        <Icon type="user" style={{fontSize: 20}}/>
                    </Col>
                    <Col span={20}>
                        <font style={{fontSize: 15}}>用户名：{this.state.username}</font>
                    </Col>
                </Row>
                <Row></Row>
                <Row style={{height: '50px'}}>
                    <Col span={4}>
                        <Icon type="pay-circle-o" style={{fontSize: 20}}/>
                    </Col>
                    <Col span={20}>
                        <font style={{fontSize: 15}}>现有积分：{this.state.mycost}</font>
                    </Col>
                </Row>
                <Button style={{height: '35px', width: '100%'}} type="danger" onClick={() => {
                    this.logOut();
                }}>登出</Button>
            </Card>

        ];
        return (
            <TweenOne
                component="header"
                animation={{opacity: 0, type: 'from'}}
                {...dataSource.wrapper}
                {...props}
            >
                <div
                    {...dataSource.page}
                    className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
                >
                    <TweenOne
                        animation={{x: -30, type: 'from', ease: 'easeOutQuad'}}
                        {...dataSource.logo}
                    >
                        <img width="100%" src={dataSource.logo.children} alt="img"/>
                    </TweenOne>
                    {isMobile && (
                        <div
                            {...dataSource.mobileMenu}
                            onClick={() => {
                                this.phoneClick();
                            }}
                        >
                            <em/>
                            <em/>
                            <em/>
                        </div>
                    )}
                    <TweenOne
                        {...dataSource.Menu}
                        animation={{x: 30, type: 'from', ease: 'easeOutQuad'}}
                        ref={(c) => {
                            this.menu = c;
                        }}
                        style={isMobile ? {height: menuHeight} : null}
                    >
                        <Menu
                            mode={isMobile ? 'inline' : 'horizontal'}
                            defaultSelectedKeys={['0']}
                            theme={isMobile ? 'dark' : 'default'}
                        >
                            <Item><Link to={{pathname: '/'}}>主页</Link></Item>
                            <Item><Link to={{pathname: '/Translation'}}>翻译</Link></Item>
                            <Item><Link to={{pathname: '/Dictionary'}}>词典</Link></Item>
                            <Item><Link to={{pathname: '/download'}}>下载</Link></Item>
                            <Item style={{display: this.state.viewRegAndLog}}><Link to={{pathname: '/login'}}>登录</Link></Item>
                            <Item style={{display: this.state.viewRegAndLog}}><Link
                                to={{pathname: '/register'}}>注册</Link></Item>
                            <Item style={{display: this.state.viewPersonal}}>
                                <Popover placement="bottomRight" content={content}>
                                    <div>个人</div>
                                </Popover>
                            </Item>
                        </Menu>
                    </TweenOne>
                </div>
            </TweenOne>
        );
    }
}

export default Header;
