import { Button, Input, message } from 'antd';
import React, { useRef } from 'react';
import FormContainer from '../../components/FormContainer';
import api from '../../services/api';


const RegisterUser: React.FC = () => {

  const userInputRef = useRef<Input>(null);

  async function handleSubmit () {

    if (!userInputRef.current?.input.value) return false;

    try {

      const { data } = await api.post('users/store', {
        username: userInputRef.current!.input.value
      });
      message.success(data);

    } catch (err) {

      message.error('Was not possible to register the company');

    }

    return true;

  }

  return (

    <FormContainer>
      <h1>Users registration form</h1>
      <Input ref={userInputRef} placeholder='Username' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Button size='large' style={{ width: 500 }} onClick={handleSubmit}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterUser;
