import React from "react";
import "antd/dist/antd.css";
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
} from "antd";
import "./ModelTable.css";

const columns = [
  {
    title: (
      <div>
        文件名称 <Icon type="file-text" />
      </div>
    ),
    dataIndex: "name",
  },
  {
    title: (
      <div>
        上传者 <Icon type="user" />
      </div>
    ),
    dataIndex: "age",
  },
  {
    title: (
      <div>
        所需积分 <Icon type="pay-circle-o" />
      </div>
    ),
    dataIndex: "address",
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

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

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

class ModelTable extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
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
            <Col span={12}>
              <Button
                type="default"
                onClick={this.showUpLoad}
                style={{ marginRight: 20, marginLeft: 10 }}
              >
                上传
              </Button>
              <Button
                type="primary"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
              >
                下载
              </Button>
            </Col>
            <Col span={6}></Col>
            <Col span={6}>
              <Search
                placeholder="搜索模型"
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
          dataSource={data}
          pagination={Pagination}
        />
      </Card>
    );
  }
}

export default ModelTable;
