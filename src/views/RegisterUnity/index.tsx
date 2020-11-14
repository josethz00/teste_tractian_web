import {
  Button,
  Input,
  message,
  Select
} from 'antd';
import { SelectValue } from 'antd/lib/tree-select';
import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import api from '../../services/api';
import FormContainer from '../../components/FormContainer';


interface CompanyDataProps {

  _id: string;
  name: string;

}

const RegisterUnity: React.FC = () => {

  const [companies, setCompanies] = useState<CompanyDataProps[]>();
  const unityInputRef = useRef<Input>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('0');

  useEffect(() => {

    api.get('companies/index').then((response) => {

      setCompanies(response.data);

    }).catch(() => {

      alert('Network error');

    });

  }, []);

  function handleChangeSelect (value: SelectValue) {

    setSelectedCompany(value.toString());

  }

  async function handleSubmit () {

    if (!selectedCompany || !unityInputRef.current?.input.value) return false;

    try {

      const { data } = await api.post('unities/store', { name: unityInputRef.current.input.value }, {
        headers: {
          company_id: selectedCompany
        }
      });
      message.success(data);

    } catch (err) {

      message.error('Was not possible to register the unity');

    }

    return true;

  }

  return (

    <FormContainer>
      <h1>Unities registration form</h1>
      <Input ref={unityInputRef} placeholder='Unity name' size='large' style={{ width: 500, margin: '20px 0px 0px 0px' }} />
      <Select
        value={selectedCompany}
        onChange={handleChangeSelect}
        size='large'
        style={{
          width: 500,
          margin: '20px 0px 20px 0px',
        }}
      >
        <Select.Option value='0' disabled>Select a company</Select.Option>
        {companies?.map((company: CompanyDataProps) => (
          <Select.Option
            key={company._id}
            value={company._id}
          >
            {company.name}
          </Select.Option>
        ))}
      </Select>
      <Button size='large' style={{ width: 500 }} onClick={handleSubmit}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterUnity;
