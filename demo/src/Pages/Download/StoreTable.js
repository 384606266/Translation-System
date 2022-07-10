import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input,
  InputNumber,
  Modal,
  message,
  Popover,
  Row,
  Table,
  Upload,
} from "antd";
import "./ModelTable.css";

const API_URL = "http://127.0.0.1:8080";

const columns = [
  {
    title: (
      <div>
        文件名称 <Icon type="file-text" />
      </div>
    ),
    dataIndex: "filename",
  },
  {
    title: (
      <div>
        上传者 <Icon type="user" />
      </div>
    ),
    dataIndex: "user",
  },
  {
    title: (
      <div>
        所需积分 <Icon type="pay-circle-o" />
      </div>
    ),
    dataIndex: "cost",
  },
];

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Search = Input.Search;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const dataTest = [  //测试数据
  {
    key: "1",
    id: "1",
    filename: "胡彦斌",
    cost: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    id: "2",
    filename: "胡彦祖",
    cost: 42,
    address: "西湖区湖底公园1号",
  },
];

class StoreTable extends React.Component {
  state = {
    data: [],
    savedData: [],
    selectedRowKeys: [], // Check here to configure the default column
    visible: false,
    filename: "", //上传文件名
    cost: "", //上传文件所需积分
    mycost: 80, //我的积分
  };

  //-----------文件下载------------
  showDownload = () => {
    let content = "";
    let allfile = [];
    let allcost = 0;
    let param = [];
    let _this = this;
    for (let i of this.state.selectedRowKeys) {
      i = i - 1; //i是当前行数，需要减一
      let file = [];
      file["id"] = this.state.data[i].id;
      file["filename"] = this.state.data[i].filename;
      file["cost"] = this.state.data[i].cost;
      param.push(file);

      allcost += file["cost"];
      content = <p>{this.state.data.filename}</p>;
      allfile.push(content);
    }
    allfile.push(
      <div style={{ fontWeight: 600 }}>
        <font>共需积分：</font>
        <font style={{ color: "red" }}>{allcost}</font>
        <font> / 您现有积分：{this.state.mycost}</font>
      </div>
    );
    confirm({
      title: "您确认要下载这些文件吗？",
      content: [allfile],
      onOk() {
        if (allcost > _this.state.mycost) {
          message.warning("您的积分不足");
          return;
        } else {
          return new Promise((resolve, reject) => {
            _this.downloadFile(param);
          }).catch(() => {
            message.error("下载失败，请刷新后再试");
          });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  downloadFile = (param) => {
    var _this = this;
    for (let each of param) {
      console.log(each);
      let id = each.id;
      let filename = each.filename;
      console.log(filename);
      axios
        .get(API_URL + "/file/download/" + id, {
          headers: {
            Username: localStorage.getItem("username"),
            Token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            _this.setState({
              //直接扣除积分，不需重新刷新界面
              mycost: _this.state.mycost - each.cost,
            });
            let blob = new Blob([response.data]);
            let blobUrl = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.download = filename;
            a.href = blobUrl;
            a.click();
          } else {
            message.error("下载文件" + filename + "失败");
          }
        });
    }
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };
  //------------文件上传------------
  showUpLoad = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    axios
      .post(
        API_URL + "/file/create/",
        {},
        {
          headers: {
            Username: localStorage.getItem("username"),
            Token: localStorage.getItem("token"),
          },
        }
      )
      .then();
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  //------------其他-------------
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  filenameChange = (e) => {
    this.setState({
      filename: e.target.value,
    });
  };

  costChange = (value) => {
    this.setState({
      cost: value,
    });
  };

  searchFile = (value) => {
    if ((value === "")) {
      this.setState({
        data: this.state.savedData.slice(0),
      });
      return;
    } else {
      let len = this.state.savedData.length;
      let list = this.state.savedData.slice(0);
      let arr = [];
      for (let i = 0; i < len; i++) {
        console.log(value)
        console.log(list[i].filename.indexOf(value) >=0);
        if (list[i].filename.indexOf(value) >=0 ) {
          arr.push(list[i]);
        }
      }
      this.setState({
        data: arr,
      });
      console.log(this.state.data,this.state.savedData);
    }
  };

  //组件加载完成时调用一次
  componentDidMount() {   //加一个用户积分的读取
    axios
      .get(API_URL + "/file", {
        headers: {
          Username: localStorage.getItem("username"),
          Token: localStorage.getItem("token"),
        },
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200 && response.data) {
            this.setState({
              data: response.data,
              savedData: response.data.slice(0),
            });
          }
        },
        (error) => {
          if (error.response.data === "No user named exists.") {
            alert("尚未登陆，请登陆！");
          }
        }
      );
      // this.setState({ //未接入后端时的测试数据
      //   data:dataTest,
      //   savedData: dataTest.slice(0),
      // });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const Pagination = {
      pageSize: 8, // 每页条数
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <Card className="model-box">
        <div style={{ marginBottom: 16 }}>
          <Modal
            title="上传文件"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="上传"
            cancelText="取消"
          >
            <div className="upload-box">
              <Form>
                <FormItem {...formItemLayout} label="文件名" hasFeedback>
                  <Input onChange={this.filenameChange}></Input>
                </FormItem>
                <FormItem {...formItemLayout} label="所需积分" hasFeedback>
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={this.costChange}
                  />
                </FormItem>
                <FormItem {...formItemLayout} label="上传文件" hasFeedback>
                  <Upload>
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                </FormItem>
              </Form>
            </div>
          </Modal>

          <Row>
            <Col span={6}>
              <Popover content={"点击此处上传文件"}>
                <Button
                  type="default"
                  onClick={this.showUpLoad}
                  style={{ marginRight: 20, marginLeft: 10 }}
                >
                  上传
                </Button>
              </Popover>

              <Button
                type="primary"
                onClick={this.showDownload}
                disabled={!hasSelected}
              >
                下载
              </Button>
            </Col>
            <Col span={12}></Col>
            <Col span={6}>
              <Search
                placeholder="搜索模型或语料库"
                onSearch={this.searchFile}
              />
            </Col>
          </Row>

          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data} //数据来源
          pagination={Pagination}
        />
      </Card>
    );
  }
}

export default StoreTable;
