<<<<<<< HEAD

=======
>>>>>>> e6aca5970e8abd1da0c9dde0b4ed34a8f95fe127
import React from "react";
import StoreTable from "./StoreTable";
import "antd/dist/antd.css";
import "./DownloadPage.css"

class DownloadPage extends React.Component {
    render() {
        return (
            <div className="download-box">
                <div className="background">
                    <StoreTable/>
                </div>
            </div>
        );
    }
}

export default DownloadPage;
