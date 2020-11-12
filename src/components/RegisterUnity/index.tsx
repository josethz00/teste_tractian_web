import { Button, Input } from 'antd';
import React, { useEffect } from 'react';
import FormContainer from '../FormContainer';


const RegisterUnity: React.FC = () => {

  useEffect(() => {

    console.log('o');

  });

  return (

    <FormContainer>
      <h1>Unities registration form</h1>
      <Input placeholder='Unity name' className='input' size='large' style={{ width: 500, margin: '20px 0px 0px 0px' }} />
      <Input placeholder='Company ID' className='input' size='large' style={{ width: 500, margin: '20px 0px 20px 0px' }} />
      <Button size='large' style={{ width: 500 }}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterUnity;
