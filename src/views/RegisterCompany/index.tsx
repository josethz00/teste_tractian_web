import { Button, Input, message } from 'antd';
import React, { useRef } from 'react';
import api from '../../services/api';
import FormContainer from '../../components/FormContainer';


const RegisterCompany: React.FC = () => {

  const companyInputRef = useRef<Input>(null);

  async function handleSubmit () {

    if (!companyInputRef.current?.input.value) return false;

    try {

      const { data } = await api.post('companies/store', {
        name: companyInputRef.current!.input.value
      });
      message.success(data);

    } catch (err) {

      message.error('Was not possible to register the company');

    }

    return true;

  }

  return (

    <FormContainer>
      <h1>Companies registration form</h1>
      <Input placeholder='Company name' required ref={companyInputRef} size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Button size='large' style={{ width: 500 }} onClick={handleSubmit}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterCompany;
