import {
  Button,
  Select,
  message,
  Descriptions,
  Modal
} from 'antd';
import { SelectValue } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import FormContainer from '../../components/FormContainer';
import api from '../../services/api';


interface CompanyDataProps {

  _id: string;
  name: string;

}

interface CompanyProps<T> {

  _id: string;
  name: string;
  __v: 2;
  unity: {
    machines: T[];
    _id: string;
    name: string;
  }[]

}

interface MachineProps {

    name: string;
    description: string;
    image_url: string;
    machine_model: string;
    health_score: number;
    status: string;
    user: {
      _id: string;
      username: string;
    }

}

const Overview: React.FC = () => {

  const [companies, setCompanies] = useState<CompanyDataProps[]>();
  const [selectedCompany, setSelectedCompany] = useState<string>('0');
  const [receivedData, setReceivedData] = useState<CompanyProps<MachineProps>>();
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useEffect(() => {

    api.get('companies/index').then((response) => {

      setCompanies(response.data);

    }).catch(() => {

      message.error('Network error');

    });

  }, []);

  function handleChangeSelect (value: SelectValue) {

    setSelectedCompany(value.toString());

  }

  async function handleSubmit () {

    if (!selectedCompany) return false;

    const { data } = await api.get(`companies/query-one/${selectedCompany}`);
    setReceivedData(data);
    console.log(data);
    return true;

  }

  function handleModalPress () {

    setModalVisibility(!modalVisibility);

  }

  return (

    <FormContainer>
      <h1>Companies overview</h1>
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
      <Button size='large' style={{ width: 500, marginBottom: 80 }} onClick={handleSubmit}>
        Search
      </Button>
      {receivedData ? (
        <>
          <Descriptions title='Company info' layout='vertical' bordered style={{ width: 650 }}>
            <Descriptions.Item label='ID' span={1}>{receivedData._id}</Descriptions.Item>
            <Descriptions.Item label='Company name' span={2}>{receivedData.name}</Descriptions.Item>
          </Descriptions>
          <br />
          <Descriptions title='Unities' layout='vertical' bordered style={{ width: 650 }}>
            {receivedData.unity.map((un) => (
              <>
                <Descriptions.Item label={un.name} span={3}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    {un.machines.map((machine: MachineProps) => (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                          role='button'
                          tabIndex={0}
                          onClick={handleModalPress}
                          onKeyDown={handleModalPress}
                        >
                          <h4>
                            Machine name:
                          </h4>
                          <h4 style={{ marginLeft: 10 }}>
                            {machine.name}
                          </h4>
                        </div>
                        <Modal
                          title='Machine info'
                          visible={modalVisibility}
                          onOk={handleModalPress}
                          onCancel={handleModalPress}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <p style={{ marginRight: 10 }}>Name: </p>
                            <p>{machine.name}</p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <p style={{ marginRight: 10 }}>Status: </p>
                            <p>{machine.status}</p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <p style={{ marginRight: 10 }}>Model: </p>
                            <p>{machine.machine_model}</p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <p style={{ marginRight: 10 }}>Health score: </p>
                            <p>{machine.health_score}</p>
                          </div>
                          <br />
                          <div
                            style={{
                              display: 'flex',
                              borderRadius: 20,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <img src={machine.image_url} alt='Foto da máquina' style={{ width: 350, borderRadius: 10 }} />
                          </div>
                        </Modal>
                      </>
                    ))}
                  </div>
                </Descriptions.Item>
              </>
            ))}
          </Descriptions>
        </>

      ) : null
      }
    </FormContainer>

  );

};

export default Overview;
