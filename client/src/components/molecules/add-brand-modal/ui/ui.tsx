import { FC } from 'react';

import { Button, Form, Input, Modal } from 'antd';

import { AddBrandModalProps } from '../model';

import './style.scss';

const AddBrandModal: FC<AddBrandModalProps> = ({ open, onCloseClick, onSubmitClick }) => {
  return (
    <Modal
      className="brand-modal"
      title="Добавлення бренду"
      open={open}
      onCancel={onCloseClick}
      footer={[]}>
      <Form
        className="form-brand"
        name="basic"
        autoComplete="off"
        layout={'vertical'}
        onFinish={onSubmitClick}>
        <Form.Item
          name="brand"
          label="Назва бренду"
          rules={[{ required: true, message: 'Це обов"язкове поле' }]}>
          <Input placeholder="Введіть назву бренду" />
        </Form.Item>

        <Button key="submit" htmlType="submit" type="primary" className="red-btn">
          Створити
        </Button>
      </Form>
    </Modal>
  );
};

export { AddBrandModal };
