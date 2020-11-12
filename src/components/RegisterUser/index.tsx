import { Button, Input } from 'antd';
import React, { useEffect } from 'react';
import FormContainer from '../FormContainer';


const RegisterUser: React.FC = () => {

  useEffect(() => {

    console.log('o');

  });

  return (

    <FormContainer>
      <h1>Users registration form</h1>
      <Input placeholder='Username' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Button size='large' style={{ width: 500 }}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterUser;
