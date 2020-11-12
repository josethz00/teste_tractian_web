import { Breadcrumb, Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import CustomHeader from '../../components/CustomHeader';
import './styles.css';


const CreateRecords: React.FC = () => {

  useEffect(() => {

    console.log('oo');

  }, []);

  return (

    <Layout style={{ backgroundColor: '#141414' }}>
      <CustomHeader />
      <Content style={{ padding: '0 50px', marginTop: 84 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Teste Tractian</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
          <Breadcrumb.Item>Create Records</Breadcrumb.Item>
        </Breadcrumb>
        <div className='register-section'>
          <div className='switcher'>

          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'transparent' }}>Teste Tractian ©2020 Created by José Thomaz</Footer>
    </Layout>

  );

};

export default CreateRecords;
