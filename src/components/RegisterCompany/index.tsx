import { Button, Input } from 'antd';
import React, { useRef } from 'react';
import api from '../../services/api';
import FormContainer from '../FormContainer';


const RegisterCompany: React.FC = () => {

  const companyInputRef = useRef<Input>(null);

  async function handleSubmit () {

    try {

      const { data } = await api.post('companies/store', {
        name: companyInputRef.current!.input.value
      });
      alert(data);

    } catch (err) {

      alert('Não foi possível cadastrar a empresa');

    }

  }

  return (

    <FormContainer>
      <h1>Companies registration form</h1>
      <Input placeholder='Company name' required ref={companyInputRef} className='input' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Button size='large' style={{ width: 500 }} onClick={handleSubmit}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterCompany;
