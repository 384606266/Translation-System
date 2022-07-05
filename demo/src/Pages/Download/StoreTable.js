import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import {
  Table,
  Button,
  Card,
  Icon,
  Modal,
  Input,
  Form,
  Upload,
  InputNumber,
  Row,
  Col,
  Popover,
} from "antd";
import "./ModelTable.css";

const API_URL = "http://111.186.44.72:8080";

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

const Search = Input.Search;

const data = [
  {
    key: "1",
    filename: "模型1",
    user: "Alice",
    cost: 1,
  },
  {
    key: "2",
    filename: "语料库1",
    user: "Bob",
    cost: 3,
  },
  {
    key: "3",
    filename: "模型2",
    user: "Alice",
    cost: 7,
  },
];

const props = {
  name: "file",
  action: "//jsonplaceholder.typicode.com/posts/",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class StoreTable extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    storeItem: [],
  };
  start = () => {
    this.setState({
      loading: true,
    });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  showUpLoad = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  componentDidMount() {
    //组件加载完成时调用一次
    axios.get(API_URL + "/getFile/").then((response) => {
      if (response.data) {
        this.state.storeItem = response.data;
      }
    });
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
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
                  <Input></Input>
                </FormItem>
                <FormItem {...formItemLayout} label="所需积分" hasFeedback>
                  <InputNumber min={1} max={10} defaultValue={1} />
                </FormItem>
                <FormItem {...formItemLayout} label="上传文件" hasFeedback>
                  <Upload {...props}>
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
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
              >
                下载
              </Button>
            </Col>
            <Col span={12}></Col>
            <Col span={6}>
              <Search
                placeholder="搜索模型或语料库"
                onSearch={(value) => console.log(value)}
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
          dataSource={data} //数据来源
          pagination={Pagination}
        />
      </Card>
    );
  }
}

export default StoreTable;
