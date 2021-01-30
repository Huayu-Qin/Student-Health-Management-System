import React from 'react';
import styles from './Login.module.css'

import { Row,Col, Form, Input, Button, message } from 'antd';
import logo from '../../assets/image/login-logo.png';
import {login} from "../../api";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 8,
  },
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default class Login extends React.Component{
  constructor(props) {
    super(props);
  }

  onFinish = async (values) => {
    const param = {
      url:'/login',
    }
    Object.assign(param, values)
    const res = await login(param)
    if(res.code == 0){
      message.success(res.message);
      this.props.history.push("/home");
    }else{
      message.error(res.message);
    }
  };

  render() {
    return (
        <div className={styles.page}>
          <Row>
            <Col span={4}></Col>
            <Col span={8}>
              <img src={logo}/>
            </Col>
            <Col span={12}>
              <Row>
                <span className={styles.title}>Student Health System</span>
              </Row>
              <Row>
                <Form
                    {...layout}
                    ref={this.formRef}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Col>
          </Row>

        </div>
    )
  }
}
