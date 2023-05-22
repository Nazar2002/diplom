import { FC } from 'react';

import { Button, Form, Input } from 'antd';

import { Message } from '@common-types';

import { ChatFooterProps } from '../model';

import './style.scss';

const ChatFooter: FC<ChatFooterProps> = ({ handleSubmit }) => {
  const [form] = Form.useForm();

  const initialValues: Message = {
    text: ''
  };

  const onSubmit = (value: Message) => {
    handleSubmit(value);

    form.resetFields();
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={onSubmit} className="form">
      <Form.Item name="text" className="footer-input">
        <Input.TextArea className="input" placeholder="Напишіть смс" />
      </Form.Item>

      <Button htmlType="submit" type="primary" className="red-btn">
        Відправити
      </Button>
    </Form>
  );
};

export { ChatFooter };
