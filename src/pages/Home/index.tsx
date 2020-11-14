import { Breadcrumb, Layout, Menu } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import CustomHeader from '../../components/CustomHeader';
import Metrics from '../../views/Metrics';
import Overview from '../../views/Overview';
import './styles.css';


const Home: React.FC = () => {

  const [selectedKey, setSelectedKey] = useState('Metrics');

  function renderElement () {

    if (selectedKey === 'Metrics') {

      return <Metrics />;

    }

    return <Overview />;

  }

  return (

    <Layout style={{ backgroundColor: '#141414' }}>
      <CustomHeader />
      <Content style={{ padding: '0 50px', marginTop: 84 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Test Tractian</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className='register-section'>
          <Menu
            onClick={(e) => setSelectedKey(String(e.key))}
            selectedKeys={[selectedKey]}
            mode='horizontal'
          >
            <Menu.Item key='Metrics'>
              Metrics
            </Menu.Item>
            <Menu.Item key='Overview'>
              Overview
            </Menu.Item>
            {renderElement()}
          </Menu>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'transparent' }}>Teste Tractian ©2020 Created by José Thomaz</Footer>
    </Layout>

  );

};

export default Home;
