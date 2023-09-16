import { ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

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
  return (
    <>
      <Modal visible={addModalOpen} onCancel={() => onCancel?.()} footer={null}>
        <ProTable
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
