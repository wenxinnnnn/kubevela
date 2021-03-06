import React, { Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import './index.less';
import { Form, Input, Button, Row, Col, Tabs, Table, Spin } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';

const { TabPane } = Tabs;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const layout1 = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Ready',
    dataIndex: 'Ready',
    key: 'Ready',
  },
  {
    title: 'Phase',
    dataIndex: 'Phase',
    key: 'Phase',
  },
  {
    title: 'Restarts',
    dataIndex: 'Restarts',
    key: 'Restarts',
  },
  {
    title: 'Node',
    dataIndex: 'Node',
    key: 'Node',
  },
  {
    title: 'Age',
    dataIndex: 'Age',
    key: 'Age',
  },
];

const data = [
  {
    key: '1',
    name: 'cool-aryabhata-v0fnxq6-788767b7f5-9zx96',
    Ready: '1/2',
    Phase: 'Pending',
    Restarts: 0,
    Node: 'cn-hongkong.10.0.1.229',
    Age: '2d',
  },
];
const columns1 = [
  {
    title: 'Type',
    dataIndex: 'Type',
    key: 'Type',
  },
  {
    title: 'Reason',
    dataIndex: 'Reason',
    key: 'Reason',
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
  },
  {
    title: 'Message',
    dataIndex: 'Message',
    key: 'Message',
  },
  {
    title: 'Last Update',
    dataIndex: 'LastUpdate',
    key: 'LastUpdate',
  },
  {
    title: 'Last Transition',
    dataIndex: 'LastTransition',
    key: 'LastTransition',
  },
];

const data1 = [
  {
    key: '1',
    Type: 'Available',
    Reason: 'MinimumReplicasUnavailable',
    Status: 'false',
    Message: 'Deployment does not have minimum availability.',
    LastUpdate: '2d',
    LastTransition: '2d',
  },
  {
    key: '2',
    Type: 'Progressing',
    Reason: 'ProgressDeadlineExceeded',
    Status: 'false',
    Message: 'ReplicaSet "cool-aryabhata-v0fnxq6-788767b7f5" has timed out progressing.',
    LastUpdate: '2d',
    LastTransition: '2d',
  },
];
// const demoText = `H4sIAAAAAAAA/6xUwW7bOhD8lYc9U4lsWfazgB4C5Na0DZK0lyKHNbmyWVMkQ66UGob/vSBdt3GCxEXRmwjujmZnZrmFtbYKGrgkb9ymI8sgAL3+QiFqZ6EB9D6eDyMQ0BGjQkZotmCxI2hAOmcKDBtcrJCxGMrWfn+Ygsj30aNMRYpa7E0CloGQtbN3uqPI2HlobG+MAIMLMjEBo/cvcEGAW3wjyZH4LGh3JpHZ0Jl25yuMK2hgPkPV1lRJbKfjWVlNpqps69mkrNu2qv5X5UzV9ULVIOC4P1IYtHxzlOGXFEMJOwForeM8Rib8GjOdZD3Avz6Ae7QUiuWwhuYZtWEk/nuvrXp3+4cgpzw53f3SsePKjrLaHHpKSuTGG2opkJUUofm6Pc7O84FAHPL2e6ZTrPssZDWq5+O6GhVqPquLybyaF9gqKsbVTMpyXFZ1m8yVznJwxlCAJrEUsDBOrj8lopdkiDOvFk2k3f1OQPQkk4mRDEl2IX13yHJ1dSqQx6nYCWDqvEGmDPFkU/4+8/86qUbbNQWVw2lTFKABsrgwpN52+olQSWDUlsLe7VPm6Q6XlPdABspPS1imTihWcC8gUHR9yNHZQqCHniLnb+l7aKAuu/zsdC5soIHp5IPOZDLqdW/MtTNapqsL84ibCLt7cVi5Cyldb/njCYLYs+tS4e1R251bkz1EaK/Rz4IrbdfxEKEkDAdkWm4Sa9749LMbZ4y2y89epTgICEfnZrvb9yH3MZ9+BAAA//+bxjCThQUAAA
//   objectset.rio.cattle.io/id	service
//   objectset.rio.cattle.io/owner-gvk	rio.cattle.io/v1, Kind=Service
//   objectset.rio.cattle.io/owner-name	cool-aryabhata-v0fnxq6
//   objectset.rio.cattle.io/owner-namespace	default
//   rio.cattle.io/mesh	true
//   Controlled By	cool-aryabhata-v0fnxq6`;

@connect(({ loading, globalData }) => ({
  loadingAll: loading.models.applist,
  currentEnv: globalData.currentEnv,
}))
class TableList extends React.PureComponent {
  formRefStep1 = React.createRef();

  formRefStep2 = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      hasShowEdit: false,
      hasShowEdit2: false,
      appDetailData: {},
    };
  }

  componentDidMount() {
    this.getInitialData();
  }

  async getInitialData() {
    const appName = _.get(this.props, 'location.state.appName', '');
    const envName = _.get(this.props, 'location.state.envName', '');
    if (appName && envName) {
      const res = await this.props.dispatch({
        type: 'applist/getAppDetail',
        payload: {
          envName,
          appName,
        },
      });
      if (res) {
        this.setState({
          appDetailData: res,
        });
      }
    }
  }

  onFinishStep1 = () => {
    this.setState({
      hasShowEdit: false,
    });
  };

  onFinishStep2 = () => {
    this.setState({
      hasShowEdit2: false,
    });
  };

  changeShowEdit = () => {
    this.setState((prev) => ({
      hasShowEdit: !prev.hasShowEdit,
    }));
  };

  changeShowEdit2 = () => {
    this.setState((prev) => ({
      hasShowEdit2: !prev.hasShowEdit2,
    }));
  };

  render() {
    const { hasShowEdit, hasShowEdit2 } = this.state;
    // let finallyText;
    // if (demoText && demoText.length > 50) {
    //   finallyText = (
    //     <Tooltip placement="topRight" title={demoText}>
    //       <Button>{`${demoText.substring(0, 50)}......`}</Button>
    //     </Tooltip>
    //   );
    // } else {
    //   finallyText = <p>{demoText}</p>;
    // }
    const status = _.get(this.state.appDetailData, 'Status', '');
    const Workload = _.get(this.state.appDetailData, 'Workload.workload', {});
    const metadata = _.get(Workload, 'metadata', {});
    let containers = {};
    // if (Workload.kind === 'ContainerizedWorkload') {
    //   containers = _.get(Workload, 'spec.containers[0]', {});
    // } else if (Workload.kind === 'Deployment') {
    //   containers = _.get(Workload, 'spec.template.spec.containers[0]', {});
    // }
    containers = _.get(Workload, 'spec.containers[0]', {});
    let { loadingAll } = this.props;
    loadingAll = loadingAll || false;
    return (
      <PageContainer>
        <Spin spinning={loadingAll}>
          <div className="card-container workload-detail">
            <h2>{Workload.kind}</h2>
            <p style={{ marginBottom: '20px' }}>
              <i>
                {Workload.apiVersion},Name={_.get(Workload, 'metadata.name', '')}
              </i>
            </p>
            <Tabs>
              <TabPane tab="Summary" key="1">
                <div>
                  <Row>
                    <Col span="12">
                      <div className="hasBorder">
                        <div
                          className="hasPadding"
                          style={{ display: !hasShowEdit ? 'block' : 'none' }}
                        >
                          <p className="title">Configuration</p>
                          <Row>
                            {Object.keys(containers).map((currentKey) => {
                              if (currentKey === 'ports') {
                                return (
                                  <Fragment key={currentKey}>
                                    <Col span="8">
                                      <p>port</p>
                                    </Col>
                                    <Col span="16">
                                      <p>
                                        {_.get(containers[currentKey], '[0].containerPort', '')}
                                      </p>
                                    </Col>
                                  </Fragment>
                                );
                                // eslint-disable-next-line no-else-return
                              } else if (currentKey === 'name') {
                                return <Fragment key={currentKey} />;
                              }
                              return (
                                <Fragment key={currentKey}>
                                  <Col span="8">
                                    <p>{currentKey}</p>
                                  </Col>
                                  <Col span="16">
                                    <p>{containers[currentKey]}</p>
                                  </Col>
                                </Fragment>
                              );
                            })}
                          </Row>
                          {/* <Row>
                            <Col span="10">
                              <div style={{ color: 'black' }}>
                                <p>Deployment Strategy</p>
                                <p>Rolling Update Strategy</p>
                                <p>Selectors</p>
                                <p>Min Ready Seconds</p>
                                <p>Revision History Limit</p>
                                <p>Replicas</p>
                              </div>
                            </Col>
                            <Col>
                              <p>RollingUpdate</p>
                              <p>Max Surge 25%, Max Unavailable 25%</p>
                              <p>
                                <Tag color="orange">aryabhataapp:cool</Tag>
                                <Tag color="orange">version:v0</Tag>
                              </p>
                              <p>0</p>
                              <p>10</p>
                              <p>1</p>
                            </Col>
                          </Row> */}
                        </div>
                        <div
                          className="hasPadding"
                          style={{ display: hasShowEdit ? 'block' : 'none' }}
                        >
                          <p className="title">Deployment Editor</p>
                          <Form
                            labelAlign="left"
                            {...layout}
                            ef={this.formRefStep1}
                            name="control-ref"
                            onFinish={this.onFinishStep1}
                          >
                            <div className="relativeBox">
                              <Form.Item name="Replicas" label="Replicas">
                                <Input type="number" />
                              </Form.Item>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <Button type="primary" htmlType="submit">
                                Submit
                              </Button>
                              <Button style={{ marginLeft: '16px' }} onClick={this.changeShowEdit}>
                                Cancle
                              </Button>
                            </div>
                          </Form>
                        </div>
                        <div style={{ display: !hasShowEdit ? 'block' : 'none' }}>
                          <div
                            style={{ width: '100%', borderTop: '1px solid #eee', height: '0px' }}
                          />
                          <div>
                            <Button
                              className="textAlignLeft"
                              type="link"
                              block
                              onClick={this.changeShowEdit}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span="1" />
                    <Col span="10">
                      <div className="hasBorder">
                        <div className="hasPadding">
                          <p className="title">Status</p>
                          <p>{status}</p>
                          {/* <Row>
                            <Col span="10">
                              <div style={{ color: 'black' }}>
                                <p>Avaliable Replicas</p>
                                <p>Ready Replicas</p>
                                <p>Total Replicas</p>
                                <p>Unavaliable Replicas</p>
                                <p>Updated Replicas</p>
                              </div>
                            </Col>
                            <Col>
                              <p>0</p>
                              <p>0</p>
                              <p>1</p>
                              <p>1</p>
                              <p>1</p>
                            </Col>
                          </Row> */}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <p className="title" style={{ marginTop: '16px' }}>
                    Pods
                  </p>
                  <Table columns={columns} dataSource={data} />
                  <p className="title">Conditions</p>
                  <Table columns={columns1} dataSource={data1} />
                  <p className="title">Pod Template</p>
                  <div className="hasBorder">
                    <div
                      className="hasPadding"
                      style={{ display: !hasShowEdit2 ? 'block' : 'none' }}
                    >
                      <p className="title">Container cool-aryabhata-v0fnxq6</p>
                      <Row>
                        <Col span="2">
                          <div style={{ color: 'black' }}>
                            <p>Image</p>
                            <p>Args</p>
                          </div>
                        </Col>
                        <Col>
                          <p>secret</p>
                          <p>[&apos;-h&apos;]</p>
                        </Col>
                      </Row>
                    </div>
                    <div
                      className="hasPadding"
                      style={{ display: hasShowEdit2 ? 'block' : 'none' }}
                    >
                      <p className="title">Deployment Editor</p>
                      <Form
                        style={{ width: '50%' }}
                        {...layout1}
                        labelAlign="left"
                        ef={this.formRefStep2}
                        name="control-ref"
                        onFinish={this.onFinishStep2}
                      >
                        <div className="relativeBox">
                          <Form.Item name="Image" label="Image">
                            <Input />
                          </Form.Item>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                          <Button style={{ marginLeft: '16px' }} onClick={this.changeShowEdit2}>
                            Cancle
                          </Button>
                        </div>
                      </Form>
                    </div>
                    <div style={{ display: !hasShowEdit2 ? 'block' : 'none' }}>
                      <div style={{ width: '100%', borderTop: '1px solid #eee', height: '0px' }} />
                      <div>
                        <Button
                          className="textAlignLeft"
                          type="link"
                          block
                          onClick={this.changeShowEdit2}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Metadata" key="2">
                <div className="hasBorder">
                  <div className="hasPadding">
                    <p className="title">Metadata</p>
                    {Object.keys(metadata).map((currentKey6) => {
                      return (
                        <Row key={currentKey6}>
                          <Col span="4">
                            <p>{currentKey6}</p>
                          </Col>
                          <Col>
                            <p>{metadata[currentKey6]}</p>
                          </Col>
                        </Row>
                      );
                    })}
                    {/* <Row>
                      <Col span="4">
                        <div style={{ color: 'black' }}>
                          <p>Age</p>
                          <p>Labels</p>
                        </div>
                      </Col>
                      <Col>
                        <p>2d</p>
                        <p>
                          <Tag color="orange">aryabhataapp:cool</Tag>
                          <Tag color="orange">version:v0</Tag>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="4">
                        <div style={{ color: 'black' }}>
                          <p>Annotations</p>
                        </div>
                      </Col>
                      <Col span="20">
                        <Row>
                          <Col span="8">
                            <div style={{ color: 'black' }}>
                              <p>deployment.kubernetes.io/revision</p>
                            </div>
                          </Col>
                          <Col>
                            <p>1</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col span="8">
                            <div style={{ color: 'black' }}>
                              <p>objectset.rio.cattle.io/applied</p>
                            </div>
                          </Col>
                          <Col span="16">{finallyText}</Col>
                        </Row>
                        <Row>
                          <Col span="8">
                            <div style={{ color: 'black' }}>
                              <p>objectset.rio.cattle.io/id</p>
                            </div>
                          </Col>
                          <Col span="16">
                            <p>service</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="4">
                        <div style={{ color: 'black' }}>
                          <p>Controlled By</p>
                        </div>
                      </Col>
                      <Col>
                        <p>cool-aryabhata-v0fnxq6</p>
                      </Col>
                    </Row> */}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Resource Viewer" key="3">
                <p>Resource Viewer</p>
              </TabPane>
              <TabPane tab="YAML" key="4">
                <p>YAML</p>
              </TabPane>
            </Tabs>
          </div>
        </Spin>
      </PageContainer>
    );
  }
}

export default TableList;
