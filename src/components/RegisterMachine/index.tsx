import { Button, Input, Upload } from 'antd';
import React, { useEffect } from 'react';
import FormContainer from '../FormContainer';


const RegisterMachine: React.FC = () => {

  useEffect(() => {

    console.log('o');

  });

  return (

    <FormContainer>
      <h1>Machines registration form</h1>
      <Input placeholder='Machine name' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Input placeholder='Machine description' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Upload>
        <Button>Click to Upload</Button>
      </Upload>
      <Input placeholder='Machine model' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Input placeholder='Health score' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Input placeholder='Unity' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Input placeholder='Responsible user' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Input placeholder='Status' className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Button size='large' style={{ width: 500 }}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterMachine;
