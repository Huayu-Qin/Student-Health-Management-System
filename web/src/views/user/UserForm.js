import React from 'react';
import {save} from "../../api";
import {DatePicker, Button, Col, Form, Input, Modal, Row, Radio,Space, PageHeader,message} from "antd";
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './User.module.css'

const { RangePicker } = DatePicker;
// 健康数据表单
export default function UserForm(props) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm(); // FormInstance

  const search = (values) => {
    props.loadTable(values)
  }
  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true);
  };

  const onSubmit = async () => {
    try {
      const data = await form.validateFields();
      const formData = {
        url: '/sys/user',
      }
      Object.assign(formData, data)
      setIsModalVisible(false);
      const res = await save(formData)
      console.log(res)
      if(res.code == 0){
        message.success("Save success");
        props.loadTable() // refresh table
      }

    } catch (errorInfo) {

    }
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 17,
    },
  };

  return (
      <>
        <PageHeader className="site-page-header" title="User List" subTitle=""/>
        <Form name="advanced_search" className={styles.searchForm} onFinish={search}>
          <Row gutter={6}>
            <Col span={10} key={1} offset={1}>
              <Form.Item name="nickname" label="Nick Name">
                <Input style={{ width: 200 }}/>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>Search</Button>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>Add</Button>
              </Space>
            </Col>
          </Row>
        </Form>

        <Modal title="User Info" visible={isModalVisible} okText="OK" onOk={onSubmit} onCancel={onClose}>
          <Form form={form} {...layout} name="basic" >

            <Form.Item name="type" label="User Type" initialValue={"admin"} rules={[{required: true, message: 'Please input!'}]}>
              <Radio.Group>
                <Radio value="admin">Admin</Radio>
                <Radio value="customer">Customer</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Username" name="username" rules={[{required: true, message: 'Please input!'}]}>
              <Input style={{ width: 200 }}/>
            </Form.Item>
            <Form.Item label="Password" name="password" initialValue={"male"} rules={[{required: true, message: 'Please input!'}]}>
              <Input.Password style={{ width: 200 }}/>
            </Form.Item>
            <Form.Item label="Nick Name" name="nickname" rules={[{required: true, message: 'Please input!'}]}>
              <Input style={{ width: 200 }}/>
            </Form.Item>
          </Form>
        </Modal>
      </>

  )
}