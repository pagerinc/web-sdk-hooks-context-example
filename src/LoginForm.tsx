import { Button, Form, Icon, Input, Select } from "antd";
import React from "react";

import { WrappedFormUtils } from "antd/lib/form/Form";
import environments from './environments';


const FormItem = Form.Item;
const Option = Select.Option;

interface IProps {
  form: WrappedFormUtils;
  handleLogin: (apiKey: string, email: string, password: string) => Promise<void>;
}

class NormalLoginForm extends React.Component<IProps, {}> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
            label="Environment"
            hasFeedback
          >
          {getFieldDecorator('apiKey', {
            rules: [
              { required: true, message: 'Please select an environment!' },
            ],
          })(
            <Select placeholder="Please select an environment">
              {environments.map((env, index) => (
                <Option key={index} value={env.apiKey}>{env.name}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="Email"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, {apiKey, email, password}) => {
      if (!err) {
        this.props.handleLogin(apiKey, email, password);
      }
    });
  };
}

export default Form.create()(NormalLoginForm);

