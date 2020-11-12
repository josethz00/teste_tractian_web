import React from 'react';
import { Button, PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';


const CustomHeader: React.FC = () => {

  const history = useHistory();

  return (

    <PageHeader
      ghost={false}
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: '#0c0c0c'
      }}
      title='Tractian Test'
      extra={[
        <Button key='2' onClick={() => history.push('create-records')}>Create Records</Button>,
        <Button key='1' type='primary' onClick={() => history.push('/')}>Home</Button>
      ]}
    />

  );

};

export default CustomHeader;
