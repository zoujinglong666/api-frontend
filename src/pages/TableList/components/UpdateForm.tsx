import { ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
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
  values: any;
};

const UpdateForm: React.FC<AddFormProps> = (props) => {
  let { addModalOpen, columns, onCancel, onSubmit, values } = props;
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);
  return (
    <>
      <Modal title={'更新接口信息'} open={addModalOpen} onCancel={() => onCancel?.()} footer={null}>
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

export default UpdateForm;
