import { Tabs} from "antd";
import React from "react";
import ModelTable from "./ModelTable";
import StoreTable from "./StoreTable";
import "antd/dist/antd.css";
import "./DownloadPage.css"

class DownloadPage extends React.Component {
  render() {
    return (
      <div className="download-box">
            <div className="background">
            <StoreTable></StoreTable>
            </div>
      </div>
    );
  }
}

export default DownloadPage;
