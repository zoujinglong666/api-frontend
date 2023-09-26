import { Button, Card, Descriptions, Divider, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoByIdsUsingPOST,
} from '@/services/zouAPI/interfaceInfoController';
import { useParams } from '@@/exports';
import TextArea from 'antd/es/input/TextArea';
import { getInvokeCountUsingPOST } from '@/services/zouAPI/userInterfaceInfoController';

const Index: React.FC = () => {
  const [, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      if (res.code === 0) {
        setData(res.data);
      }
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoByIdsUsingPOST({
        id: params.id,
        ...values,
      });
      if (res.code === 0) {
        setInvokeRes(res.data);
        message.success('请求成功');
      }
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  const getInvokeCount = async (item: API.InterfaceInfo) => {
    const params = {
      id: item.id as number,
    };

    const res = await getInvokeCountUsingPOST(params);
    if (res.code === 0) {
      message.success('获取调用次数成功');
    }
    console.log(item);
  };

  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.userRequestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.reponseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
            <Descriptions.Item label="获取调用次数">
              <Button onClick={() => getInvokeCount(data)}> 获取调用次数</Button>
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card title="在线测试">
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item label="请求参数" name="userRequestParams">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
