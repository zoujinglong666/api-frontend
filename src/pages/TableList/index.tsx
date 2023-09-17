import {
  addInterfaceInfo,
  delInterfaceInfo,
  ListInterfaceInfo,
  updateInterfaceInfo,
} from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import AddForm from '@/pages/TableList/components/AddForm';
import UpdateForm from '@/pages/TableList/components/UpdateForm';

const TableList: React.FC = () => {
  const [addModalOpen, handleAddModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<any>();
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);
  const intl = useIntl();
  const reload = () => {
    if (actionRef) {
      actionRef.current?.reload();
    }
  };
  const reset = () => {
    handleAddModalOpen(false);
    setCurrentRow({});
  };

  const closeUpdateModal = () => {
    handleUpdateModalOpen(false);
  };
  const handleAdd = async (fields: any) => {
    try {
      console.log(fields);
      const res = await addInterfaceInfo({ ...fields });
      if (res.code === 0) {
        message.success('添加成功');
        reset();
        reload();
        return true;
      }
    } catch (error) {
      message.error('添加失败');
      return false;
    }
  };

  const handleUpdate = async (fields: any) => {
    try {
      const res = await updateInterfaceInfo({ ...fields, id: currentRow.id });
      if (res.code === 0) {
        message.success('修改成功');
        closeUpdateModal();
        reload();
        return true;
      }
    } catch (error) {
      message.error('修改失败');
      return false;
    }
  };

  const delInterfaceInfoById = async (id: number) => {
    if (id <= 0) {
      return;
    }
    const res = await delInterfaceInfo({ id: id });
    if (res.data) {
      message.success('删除成功');
      reload();
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description" />,
      dataIndex: 'description',
    },
    {
      title: '接口方法',
      dataIndex: 'method',
    },
    {
      title: '接口类型',
      dataIndex: 'type',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
    },
    {
      title: '响应头',
      dataIndex: 'reponseHeader',
    },
    {
      title: 'url',
      dataIndex: 'url',
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.default"
              defaultMessage="Shut down"
            />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running" />
          ),
          status: 'Processing',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          详情
        </a>,
        <a
          key="subscribeAlert"
          onClick={() => {
            delInterfaceInfoById(record?.id);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAddModalOpen(true);
              setCurrentRow({});
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        // @ts-ignore
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: {
            pageSize: number;
            current: number;
          },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const res = await ListInterfaceInfo({
            page: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: res.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.data?.length,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}

      <AddForm
        addModalOpen={addModalOpen}
        columns={columns}
        onCancel={() => reset()}
        onSubmit={(values) => handleAdd(values)}
      ></AddForm>
      <UpdateForm
        addModalOpen={updateModalOpen}
        columns={columns}
        onCancel={() => closeUpdateModal()}
        onSubmit={(values) => handleUpdate(values)}
        values={currentRow}
      ></UpdateForm>
    </PageContainer>
  );
};

export default TableList;
