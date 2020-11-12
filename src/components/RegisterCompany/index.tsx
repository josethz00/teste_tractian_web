import { Button, Input } from 'antd';
import React, { useEffect } from 'react';
import FormContainer from '../FormContainer';


const RegisterCompany: React.FC = () => {

  useEffect(() => {

    console.log('o');

  });

  return (

    <FormContainer>
      <h1>Companies registration form</h1>
      <Input placeholder='Company name' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Button size='large' style={{ width: 500 }}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterCompany;
