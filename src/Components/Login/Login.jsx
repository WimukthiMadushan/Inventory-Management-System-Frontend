import React from "react";
import { Modal, Button, Form, Input, Tabs } from "antd";

const { TabPane } = Tabs;

const Login = ({
  isVisible,
  activeTab,
  setActiveTab,
  onSignUp,
  onSignIn,
  onCancel,
  loading,
  setLoading,
}) => {
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      await onSignIn(values);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (values) => {
    setLoading(true);
    try {
      await onSignUp(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Welcome" open={isVisible} onCancel={onCancel} footer={null}>
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
        <TabPane tab="Login" key="login">
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input disabled={loading} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password disabled={loading} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Log In
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Sign Up" key="signup">
          <Form layout="vertical" onFinish={handleSignup}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input disabled={loading} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input disabled={loading} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password disabled={loading} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default Login;
