import React, { useState, useEffect } from 'react';
import './TranslationTool.less'
import axios from 'axios';
import Select from 'react-select';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { TextArea } = Input;

const options1 = [
    {value:'1',label:"中文->小语种"},
    {value:'0',label:"小语种->中文"}
]

const options = [
    { value: 'Romanian', label: '罗马尼亚语' },
    { value: 'Polish', label: '波兰语' },
    { value: 'Czech', label: '捷克语' },
    { value: 'Greek', label: '希腊语' },
    { value: 'Hungary', label: '匈牙利语' },
    { value: 'Bulgarian', label: '保加利亚语' },
    { value: 'Latvian', label: '拉脱维亚语' },
    { value: 'Lithuanian', label: '立陶宛语' },
    { value: 'Arabic', label: '阿拉伯语' },
    { value: 'Russian', label: '俄语' },
    { value: 'Hindi', label: '印地语' },
    { value: 'Hebrew', label: '希伯来语' },
    { value: 'Bengalese', label: '孟加拉语' },
    { value: 'Malaysian', label: '马来西亚语' },
    { value: 'Farsi', label: '波斯语' },
    { value: 'Indonesian', label:'印度尼西亚语'},
    { value: 'Slovenian', label:'斯洛文尼亚语'},
    { value: 'Serbian', label:'塞尔维亚语'},
    { value: 'Turkish', label:'土耳其语'},
    { value: 'Slovak', label:'斯洛伐克语'},
    { value: 'Vietnamese', label:'越南语'},
    { value: 'Thai', label:'泰语'},
    { value: 'Macedonia', label:'马其顿语'},
    { value: 'Albanian', label:'阿尔巴尼亚语'},
    { value: 'Estonian', label:'爱沙尼亚语'},
    { value: 'Bosnian', label:'波斯尼亚语'},
    { value: 'Azerbaijan', label:'阿塞拜疆语'},
    { value: 'Byelorussian', label:'白俄罗斯语'},
    { value: 'Georgian', label:'格鲁尼亚语'},
    { value: 'Kazakhstan', label:'哈萨克斯坦语'},
    { value: 'Kampuchean', label:'柬埔寨语'},
    { value: 'Mongolian', label:'蒙古语'},
    { value:'Burmese', label:'缅甸语'},
    { value:'Sinhala', label:'僧伽罗语'},
    { value:'Tamil', label:'泰米尔语'},
    { value:'Ukrainian', label:'乌克兰语'}
  ];

const WAIT_INTERVAL = 700;

const TranslationTool = () => {

    const [value, setValue] = useState("");
    const [timer, setTimer] = useState(null);
    const [output, setOutput] = useState("");
    const [valueState,setValueState] = useState(null)
    const [directionState, setDirectionState] = useState(null)

    useEffect(() => {
        const translateRequest = () => {
            if (value !== "") {
                axios.post('http://202.120.36.7:55000/translate/', {
                    uuid: 'ABCDEF1234',
                    source: value,
                    language: valueState["value"],
                    direction:directionState,
                    flag:'0'
                })
                .then(function (response) {
                    setOutput(response.data.output);
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                setOutput("");
            }
        };
        setTimer(setTimeout(translateRequest, WAIT_INTERVAL));
        // eslint-disable-next-line 
    }, [value],[valueState],[directionState]);


    const handleOnChange = (event) => {
        clearTimeout(timer);
        setValue(event.target.value);
    }
    //new
    const handler = (selectedOption)=>{
        setValueState(selectedOption);
    }
    //new
    const handler1 = (selectedOption1)=>{
        setDirectionState(selectedOption1);
    }

    return (
        <div className="block background">
            <div className="fluid-container ">
            <Row gutter={[32, 24]}>
                <Col span={8} offset={1}>
                    <Select 
                    directionState={options1.value}
                    options={options1}
                    defaultValue={options1[0]}
                    onChange={handler1}
                    />
                </Col>  
            </Row>
            <Row gutter={[32, 24]}>
                    <Col span={8} offset={1}>
                        <Select 
                        valueState={options.value}
                        options={options}
                        defaultValue={options[0]}
                        onChange={handler}
                        />
                    </Col> 
            </Row>
            <Row gutter={[32, 24]}>
            <QueueAnim
              type="bottom"
              key="block"
            >
                <Col span={12}>
                    <TextArea 
                        className="form-control translate-textarea"
                        placeholder="输入"
                        rows="8"
                        value={value}
                        onChange={handleOnChange}
                    />
                </Col>
                <Col span={12}>
                    <TextArea className="form-control translate-textarea" 
                        placeholder="输出"
                        rows="8"
                        value={output}
                        readOnly 
                    />
                </Col>
            </QueueAnim>
            </Row> 
            </div>
        </div>
    );

};

export default TranslationTool;
