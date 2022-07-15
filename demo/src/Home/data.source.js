import React from 'react';
import Logo from './imgs/logo.png'
import pic1 from './imgs/category.png'
import language from './imgs/language.png'
import serve from './imgs/serve.png'
// import huawei from './imgs/huawei.png'
// import speech from './imgs/speech.png'
// import mayi from './imgs/mayi.png'
// import keda from './imgs/keda.png'

export const Nav00DataSource = {
    wrapper: {className: 'header0 home-page-wrapper'},
    page: {className: 'home-page'},
    logo: {
        className: 'header0-logo',
        children: Logo,
    },
    Menu: {
        className: 'header0-menu',
        children: [
            {name: 'item0', a: {children: '主页', href: '/'}},
            {name: 'item1', a: {children: '翻译', href: '/Translation'}},
            {name: 'item2', a: {children: '词典', href: '/Dictionary'}},
            {name: 'item3', a: {children: '下载', href: '/download'}},
            {name: 'item4', a: {children: '登录', href: '/login'}},
            {name: 'item5', a: {children: '注册', href: '/register'}},
        ],
    },
    mobileMenu: {className: 'header0-mobile-menu'},
};

export const Banner00DataSource = {
    wrapper: {className: 'banner0'},
    textWrapper: {className: 'banner0-text-wrapper'},
    title: {
        className: 'banner0-title',
        children: Logo,  //    'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png'
    },
    content: {
        className: 'banner0-content',
        children: (
            <span>

      </span>
        ),
    },
    button: {className: 'banner0-button', children: 'Learn More'},
};

export const Content00DataSource = {
    wrapper: {className: 'home-page-wrapper content0-wrapper'},
    page: {className: 'home-page content0'},
    OverPack: {playScale: 0.3, className: ''},
    titleWrapper: {
        className: 'title-wrapper',
        children: [{name: 'title', children: '产品特色'}],
    },
    block: {
        className: 'block-wrapper',
        children: [
            {
                name: 'block0',
                className: 'block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'icon',
                        children: language,
                        // 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
                    },
                    title: {children: '面向“一带一路”低资源语种'},
                    content: {children: '促进区域合作和文化传播'},
                },
            },
            {
                name: 'block1',
                className: 'block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'icon',
                        children:
                        pic1,
                    },
                    title: {children: '多终端多场景使用'},
                    content: {children: '旅游、商务、教育、安全等场景'},
                },
            },
            {
                name: 'block2',
                className: 'block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'icon',
                        children: serve,
                        // 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
                    },
                    title: {children: '多样化的服务'},
                    content: {children: '集成式一体化的服务平台'},
                },
            },
            {
                name: 'block3',
                className: 'block',
                md: 8,
                xs: 24,
                children: {
                    icon: {
                        className: 'icon',
                        children:
                            'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
                    },
                    title: {children: '一站式数据运营'},
                    content: {children: '沉淀产品接入效率和运营小二工作效率数据'},
                },
            },
        ],
    },
};
export const Content70DataSource = {
    wrapper: {className: 'home-page-wrapper content7-wrapper'},
    page: {className: 'home-page content7'},
    OverPack: {},
    titleWrapper: {
        className: 'title-wrapper',
        children: [
            {
                name: 'title',
                children: '译通丝路提供多样化的专业服务',
                className: 'title-h1',
            },
            {name: 'content', children: '依托本平台的基础资源'},
        ],
    },
    tabsWrapper: {className: 'content7-tabs-wrapper'},
    block: {
        children: [
            {
                name: 'block0',
                tag: {
                    className: 'content7-tag',
                    text: {children: '社区/个人', className: 'content7-tag-name'},
                    icon: {children: 'mobile'},
                },
                content: {
                    className: 'content7-content',
                    text: {
                        className: 'content7-text',
                        md: 14,
                        xs: 24,
                        children: (
                            <span>
                <h3>翻译服务</h3>
                <p>
                  面向一带一路36种低资源语种的翻译服务及其衍生服务
                </p>
                <br/>
                <h3>语料库产品</h3>
                <p>
                  维护开源社区提供语料库产品，自主研发的语料库以开源的形式展现，欢迎更多从业人员贡献语料库，点滴积累，聚木成林
                </p>
                <br/>
                <h3>
                  模型产品
                </h3>
                在开源社区中提供已有的翻译模型，基于不断扩展的语料库在线学习，持续提升翻译性能，可持续发展
              </span>
                        ),
                    },
                    img: {
                        className: 'content7-img',
                        children:
                            'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
                        md: 10,
                        xs: 24,
                    },
                },
            },
            {
                name: 'block1',
                tag: {
                    className: 'content7-tag',
                    icon: {children: 'tablet'},
                    text: {className: 'content7-tag-name', children: '商业机构'},
                },
                content: {
                    className: 'content7-content',
                    text: {
                        className: 'content7-text',
                        md: 14,
                        xs: 24,
                        children: (
                            <span>
                <h3>定制化服务</h3>
                <p>
                  定制翻译系统：基于轻量化、易迁移、低算力部署的特性，为企业用户提供成型系统售卖及部署服务
                </p>
                <p>
                  定制翻译服务：提供更准确、更快速地个性化翻译服务。提供加速推理引擎，并支持翻译结果的风格化，例如口语化、学术化等。

                </p>
                <p>
                  衍生语言服务：依托本项目提供多种自然语言处理服务，例如网络空间净化、禁售商品识别等。
                </p>
                <br/>
                <h3>私有化服务</h3>
                <p>
                  私有模型：托管企业私有模型，兼容本平台系统提供翻译服务，完成企业级翻译模型构建
                </p>
                <p>
                    私有语料：根据需求依托本平台等语料库获取对齐模块构建高质量双语语料，以支持其他NLP下游任务，构建商业壁垒。
                </p>
                <br/>

              </span>
                        ),
                    },
                    img: {
                        className: 'content7-img',
                        md: 10,
                        xs: 24,
                        children:
                            'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
                    },
                },
            },
            // {
            //     name: 'block2',
            //     tag: {
            //         className: 'content7-tag',
            //         text: {children: 'DESKTOP', className: 'content7-tag-name'},
            //         icon: {children: 'laptop'},
            //     },
            //     content: {
            //         className: 'content7-content',
            //         text: {
            //             className: 'content7-text',
            //             md: 14,
            //             xs: 24,
            //             children: (
            //                 <span>
            //     <h3>技术</h3>
            //     <p>
            //       丰富的技术组件，简单组装即可快速搭建金融级应用，丰富的技术组件，简单组装即可快速搭建金融级应用。
            //     </p>
            //     <br/>
            //     <h3>融合</h3>
            //     <p>
            //       解放业务及技术生产力，推动金融服务底层创新，推动金融服务底层创新。解放业务及技术生产力，推动金融服务底层创新。
            //     </p>
            //     <br/>
            //     <h3>
            //       开放
            //     </h3>
            //     符合金融及要求的安全可靠、高可用、高性能的服务能力，符合金融及要求的安全可靠、高可用、高性能的服务能力。
            //   </span>
            //             ),
            //         },
            //         img: {
            //             className: 'content7-img',
            //             md: 10,
            //             xs: 24,
            //             children:
            //                 'https://zos.alipayobjects.com/rmsportal/xBrUaDROgtFBRRL.png',
            //         },
            //     },
            // },
        ],
    },
};
// export const Content130DataSource = {
//     OverPack: {
//         className:
//             'home-page-wrapper content13-wrapper home-page-wrapper content13-wrapper jnwq7vhwgqg-editor_css',
//         playScale: 0.3,
//     },
//     titleWrapper: {
//         className: 'title-wrapper',
//         children: [
//             {name: 'title', children: '丰富的特色展台', className: 'title-h1'},
//             {
//                 name: 'content',
//                 children:
//                     '特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家',
//                 className: 'title-content',
//             },
//             {
//                 name: 'content2',
//                 children: '现场问诊，为你答疑解难',
//                 className: 'title-content',
//             },
//         ],
//     },
// };
// export const Content120DataSource = {
//     wrapper: {className: 'home-page-wrapper content12-wrapper'},
//     page: {className: 'home-page content12'},
//     OverPack: {playScale: 0.3, className: ''},
//     titleWrapper: {
//         className: 'title-wrapper',
//         children: [{name: 'title', children: '特别鸣谢', className: 'title-h1'}],
//     },
//     block: {
//         className: 'img-wrapper',
//         children: [
//             {
//                 name: 'block0',
//                 className: 'block',
//                 md: 8,
//                 xs: 24,
//                 children: {
//                     wrapper: {className: 'logo-img'},
//                     img: {
//                         children: speech,
//                             // 'https://gw.alipayobjects.com/zos/rmsportal/TFicUVisNHTOEeMYXuQF.svg',
//                     },
//                 },
//             },
//             {
//                 name: 'block1',
//                 className: 'block',
//                 md: 8,
//                 xs: 44,
//                 children: {
//                     wrapper: {className: 'block-content'},
//                     img: {
//                         children: huawei,
//                             // 'https://gw.alipayobjects.com/zos/rmsportal/hkLGkrlCEkGZeMQlnEkD.svg',
//                     },
//                 },
//             },
//             {
//                 name: 'block2',
//                 className: 'block',
//                 md: 8,
//                 xs: 24,
//                 children: {
//                     wrapper: {className: 'block-content'},
//                     img: {
//                         children: mayi,
//                             // 'https://gw.alipayobjects.com/zos/rmsportal/bqyPRSZmhvrsfJrBvASi.svg',
//                     },
//                 },
//             },
//             {
//                 name: 'block3',
//                 className: 'block',
//                 md: 8,
//                 xs: 24,
//                 children: {
//                     wrapper: {className: 'block-content'},
//                     img: {
//                         children: keda,
//                             // 'https://gw.alipayobjects.com/zos/rmsportal/UcsyszzOabdCYDkoPPnM.svg',
//                     },
//                 },
//             },
//             {
//                 name: 'block4',
//                 className: 'block',
//                 md: 8,
//                 xs: 24,
//                 children: {
//                     wrapper: {className: 'block-content'},
//                     img: {
//                         children:
//                             'https://gw.alipayobjects.com/zos/rmsportal/kRBeaICGexAmVjqBEqgw.svg',
//                     },
//                 },
//             },
//             {
//                 name: 'block5',
//                 className: 'block',
//                 md: 8,
//                 xs: 24,
//                 children: {
//                     wrapper: {className: 'block-content'},
//                     img: {
//                         children:
//                             'https://gw.alipayobjects.com/zos/rmsportal/ftBIiyJcCHpHEioRvPsV.svg',
//                     },
//                 },
//             },
//         ],
//     },
// };
export const Footer00DataSource = {
    wrapper: {className: 'home-page-wrapper footer0-wrapper'},
    OverPack: {className: 'home-page footer0', playScale: 0.05},
    copyright: {
        children: (
            <span>
        {' '}
                <a href>译通丝路团队</a>
                {' '}
                YTSL
                © 2022
      </span>
        ),
    },
};