import { Button, Input, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import FormContainer from '../FormContainer';


interface CompanyDataProps {

  companyId: string;
  name: string;

}

const RegisterUnity: React.FC = () => {

  const [companies, setCompanies] = useState<CompanyDataProps[]>();
  const unityInputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {

    api.get('companies/index').then((response) => {

      setCompanies(response.data);

    }).catch(() => {

      alert('Network error');

    });

  });

  async function handleSubmit () {

    try {

      const { data } = await api.post('companies/store', {
        name: unityInputRef.current?.value
      });
      alert(data);

    } catch (err) {

      alert('Não foi possível cadastrar a empresa');

    }

  }

  return (

    <FormContainer>
      <h1>Unities registration form</h1>
      <Input placeholder='Unity name' size='large' style={{ width: 500, margin: '20px 0px 0px 0px' }} />
      <Select size='large' ref={unityInputRef} style={{ width: 500, margin: '20px 0px 20px 0px' }}>
        {companies?.map((company: CompanyDataProps) => (
          <>
            <Option value={company.companyId}>
              {company.name}
            </Option>
          </>
        ))}
      </Select>
      <Button size='large' style={{ width: 500 }} onClick={handleSubmit}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterUnity;
