import React, { useState, useEffect } from 'react';
import './DictionaryTool.less'
import axios from 'axios';
import Select from 'react-select';
import { Row, Col } from 'antd';
import { Input } from 'antd';


const { TextArea } = Input;

const empty = ( <Col span={24}></Col> );

const options = [
    { value: 'Chinese', label: '中文'},
    { value: 'Polish', label: '波兰语' },
    { value: 'Romanian', label: '罗马尼亚语' },
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

const Dictionary = () => {

    const [value, setValue] = useState("");
    const [timer, setTimer] = useState(null);
    const [CHTran,setCHTran] = useState("");
    const [output, setOutput] = useState({part:'', means:[''] });
    const [sentences,setSentences] = useState({cn:'',fo:''});
    const [valueState,setValueState] = useState(null);

    useEffect(() => {
        const translateRequest = () => {
            if (value !== "") {
                if (valueState["value"] !== 'Chinese'){
                    //翻译方向为小语种到中文时，先调翻译模型翻译成中文
                    axios.post('http://202.120.36.7:55000/translate/', {
                        uuid: 'ABCDEF1234',
                        source: value,
                        language: valueState["value"],
                        direction:valueState["value"],
                        flag: "1"
                    })
                    .then(function (response) {
                        setCHTran(response.data.output)
                        if(response.data.output!==""){
                            axios.post('http://202.120.36.7:55000/dict/', {
                                uuid: 'ABCDEF1234',
                                source: response.data.output,
                                language:'Chinese',
                            })
                            .then(function (response) {
                                if(response.data.output.words.length !== 0){
                                    console.log(response.data.output.words.length)
                                    
                                    setOutput(response.data.output.words[0]);
                                    setSentences(response.data.output.sentences[0]);
                                }
                                else{
                                    setCHTran(...CHTran,'');
                                    setOutput(...output,
                                        '',['词义']
                                    );
                                    setSentences(...sentences,
                                        '',''
                                        );
                                }
                                
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        } else {
                            setOutput(...output,
                                '',['词义']
                            );
                            setSentences(...sentences,
                                '',''
                                );
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                } else{
                    //翻译方向为中文到小语种时，直接调用词典
                    axios.post('http://202.120.36.7:55000/dict/', {
                        uuid: 'ABCDEF1234',
                        source: value,
                        language: valueState['value'],
                    })
                    .then(function (response) {
                        if(response.data.output.words.length !== 0){
                            console.log(response.data.output.words.length)
                            setOutput(response.data.output.words[0]);
                            setSentences(response.data.output.sentences[0]);
                        }
                        else{
                            setOutput(...output,
                                '',['词义']
                            );
                            setSentences(...sentences,
                                '',''
                                );
                        }                 
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            } else {
                setOutput(...output,
                    '',['词义']
                );
                setSentences(...sentences,
                    '',''
                    );
            }
        };
        setTimer(setTimeout(translateRequest, WAIT_INTERVAL));
        // eslint-disable-next-line 
    }, [value],[valueState]);

    const handleOnChange = (event) => {
        clearTimeout(timer);
        setValue(event.target.value);
    }

    const handler = (selectedOption)=>{
        setValueState(selectedOption);
    }

    return (
        <div className="block background">
            <Row gutter={[32, 24]}>
                {empty}
                <Col span={10} offset={7}>
                    <Select 
                    valueState={options.value}
                    options={options}
                    defaultValue={options[0]}
                    //onChange={(selectedOption) => setValueState(selectedOption)}
                    onChange={handler}
                    />
                </Col> 
                {empty} 
            </Row>
            <Row gutter={[32, 24]}>
                <Col span={14}  offset={5}>
                    <TextArea 
                        className="form-control translate-textarea"
                        placeholder="单词输入"
                        rows="1"
                        value={value}
                        onChange={handleOnChange}
                    />
                </Col>
            </Row>
            <Row gutter={[32, 24]}>
                <Col span={14}  offset={5}>
                    <TextArea 
                        className="form-control translate-textarea" 
                        placeholder="输出"
                        rows="6"
                        value={"中文释义:\t" + CHTran + '\n' +
                            "词性:\t"+output.part+'\n'
                            +"词义：\t"+output.means+'\n'
                            +"中文示例：\t"+sentences.cn+'\n'
                            +"英文示例：\t"+sentences.fo
                            }
                        readOnly 
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Dictionary;