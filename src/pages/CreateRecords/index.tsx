import { Breadcrumb, Layout, Menu } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import CustomHeader from '../../components/CustomHeader';
import RegisterCompany from '../../components/RegisterCompany';
import RegisterMachine from '../../components/RegisterMachine';
import RegisterUnity from '../../components/RegisterUnity';
import RegisterUser from '../../components/RegisterUser';
import './styles.css';


const CreateRecords: React.FC = () => {

  const [selectedKey, setSelectedKey] = useState('Company');

  function renderElement () {

    if (selectedKey === 'Company') {

      return <RegisterCompany />;

    }
    if (selectedKey === 'Unity') {

      return <RegisterUnity />;

    }
    if (selectedKey === 'User') {

      return <RegisterUser />;

    }
    return <RegisterMachine />;

  }

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
          <Menu
            onClick={(e) => setSelectedKey(String(e.key))}
            selectedKeys={[selectedKey]}
            mode='horizontal'
          >
            <Menu.Item key='Company'>
              Register Company
            </Menu.Item>
            <Menu.Item key='Unity'>
              Register Unity
            </Menu.Item>
            <Menu.Item key='User'>
              Register User
            </Menu.Item>
            <Menu.Item key='Machine'>
              Register Machine
            </Menu.Item>
            {renderElement()}
          </Menu>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'transparent' }}>Teste Tractian ©2020 Created by José Thomaz</Footer>
    </Layout>

  );

};

export default CreateRecords;
