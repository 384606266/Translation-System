import React, { Fragment } from 'react';
import TranslationTool from '../../components/TranslationTool/TranslationTool';

import './Translation.less';

const Translation = () => {
    return(
        <Fragment>
            <div className="title">面向一带一路的低资源语种机器翻译系统</div>
            <TranslationTool />
        </Fragment>
    )

};

export default Translation;