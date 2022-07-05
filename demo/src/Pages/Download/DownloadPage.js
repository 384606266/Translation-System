import { Tabs} from "antd";
import React from "react";
import ModelTable from "./ModelTable";
import StoreTable from "./StoreTable";
import "antd/dist/antd.css";
import "./DownloadPage.css"

class DownloadPage extends React.Component {
  render() {
    const { TabPane } = Tabs;
    return (
      <div className="download-box">
        <Tabs defaultActiveKey="1">
          <TabPane tab="模型和语料库" key="1">
            <StoreTable></StoreTable>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default DownloadPage;
