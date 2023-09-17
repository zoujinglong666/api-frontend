import { ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useRef } from 'react';
// @ts-ignore
import { ProFormInstance } from '@ant-design/pro-form/lib';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type AddFormProps = {
  onCancel?: (flag?: boolean) => void;
  onSubmit?: (values: any) => void;
  addModalOpen: boolean;
  columns: any;
};
const AddForm: React.FC<AddFormProps> = (props) => {
  let { addModalOpen, columns, onCancel, onSubmit } = props;
  const formRef = useRef<ProFormInstance>();
  return (
    <>
      <Modal title={'新增接口信息'} open={addModalOpen} onCancel={() => onCancel?.()} footer={null}>
        <ProTable
          formRef={formRef}
          type={'form'}
          columns={columns}
          onSubmit={async (value) => {
            onSubmit?.(value);
          }}
        ></ProTable>
      </Modal>
    </>
  );
};

export default AddForm;
