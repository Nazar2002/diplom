import { FC } from 'react';

import { Button, Form, Input, Modal, Rate, Select, Upload } from 'antd';

import TextArea from 'antd/lib/input/TextArea';

import { DeleteFilled } from '@ant-design/icons';

import { AddProductModalProps, useAddProductModel } from '../model';

import './style.scss';

const AddProductModal: FC<AddProductModalProps> = ({ open, onCloseClick }) => {
  const modal = useAddProductModel();

  const [form] = Form.useForm();

  return (
    <Modal
      className="product-modal"
      title="Добавлення продукту"
      open={open}
      onCancel={onCloseClick}
      footer={[]}>
      <Form
        form={form}
        onChange={() => modal.setAllInfoChange(form.getFieldsValue())}
        className="form-product"
        name="basic"
        autoComplete="off"
        layout={'vertical'}
        onFinish={(values) => modal.onSubmitClick(values)}>
        <Form.Item
          name="name"
          label="Назва продукту"
          rules={[{ required: true, message: 'Це обов"язкове поле' }]}>
          <Input placeholder="Введіть назву продукту" />
        </Form.Item>

        <Form.Item
          name="mainDescription"
          label="Опис продукту"
          rules={[{ required: true, message: 'Це обов"язкове поле' }]}>
          <TextArea placeholder="Введіть опис продукту" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Ціна продукту"
          rules={[{ required: true, message: 'Це обов"язкове поле' }]}>
          <Input placeholder="Введіть ціну продукту" />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Рейтинг продукту"
          rules={[{ required: true, message: 'Це обов"язкове поле' }]}>
          <Rate />
        </Form.Item>

        <div className="photo">
          <h4 className="label">Фото товару</h4>

          <Upload showUploadList={false} onChange={(info) => modal.setFile(info.file)}>
            <Button type="primary" className="red-btn">
              Загрузити фото
            </Button>
          </Upload>

          {modal.file && (
            <img
              className="image"
              src={`${URL.createObjectURL(modal?.file.originFileObj)}`}
              alt="image"
            />
          )}
        </div>

        <Form.Item name="brand" label="Бренд продукту">
          <Select placeholder="Виберіть бренд">
            {modal.brands.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="type" label="Тип продукту">
          <Select placeholder="Тип продукту">
            {modal.types.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className="list-characteristic">
          <h4 className="label">Характеристики товару</h4>

          {modal.info.map((item) => (
            <div className="info-product">
              <Input
                value={item.title}
                placeholder="Назва характеристики"
                onChange={(e) => modal.changeInfo('title', e.target.value, item.number)}
              />

              <Input
                value={item.description}
                placeholder="Назва характеристики"
                onChange={(e) => modal.changeInfo('description', e.target.value, item.number)}
              />

              <DeleteFilled onClick={() => modal.removeInfo(item.number)} />
            </div>
          ))}
        </div>

        <Button type="primary" className="red-btn" onClick={modal.addInfo}>
          Добавити нову характеристику
        </Button>

        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          className="red-btn"
          disabled={modal.disabled}>
          Створити
        </Button>
      </Form>
    </Modal>
  );
};

export { AddProductModal };
