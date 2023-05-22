import { FC } from 'react';

import { Button, Form, Input, Modal } from 'antd';

import { AddTypeModalProps } from '../model';

import './style.scss';

const AddTypeModal: FC<AddTypeModalProps> = ({ open, onCloseClick, onSubmitClick }) => {
  return (
    <Modal
      className="type-modal"
      title="Добавлення типу"
      open={open}
      onCancel={onCloseClick}
      footer={[]}>
      <Form
        className="form-type"
        name="basic"
        autoComplete="off"
        layout={'vertical'}
        onFinish={onSubmitClick}>
        <Form.Item
          name="type"
          label="Назва типу"
          rules={[{ required: true, message: 'Це обов"язкове поле' }]}>
          <Input placeholder="Введіть назву типу" />
        </Form.Item>

        <Button key="submit" htmlType="submit" type="primary" className="red-btn">
          Створити
        </Button>
      </Form>
    </Modal>
  );
};

export { AddTypeModal };
