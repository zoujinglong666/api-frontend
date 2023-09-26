import { Button, List } from 'antd';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { listInterfaceInfoUsingGET } from '@/services/zouAPI/interfaceInfoController';
import { history } from '@umijs/max';

const App: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [, setData] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const onLoadMore = async () => {
    setLoading(true);
    const res = await listInterfaceInfoUsingGET({});
    console.log(res);
    setInitLoading(false);
    setList(res.data as any[]);
    setData(res.data as any[]);
  };
  // 跳转到指定路由
  const onView = (item: any) => {
    history.push(`/interface_details/${item.id}`);
  };

  useEffect(() => {
    onLoadMore();
  }, []);

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <PageContainer title={'在线api开放平台'}>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                key="list-loadmore-edit"
                onClick={() => {
                  onView(item);
                }}
              >
                查看
              </a>,
            ]}
          >
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </PageContainer>
  );
};
export default App;
