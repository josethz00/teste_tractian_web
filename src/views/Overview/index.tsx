import {
  Button,
  Select,
  message,
  Descriptions
} from 'antd';
import { SelectValue } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import CustomModal from '../../components/CustomModal';
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
  const [modalData, setModalData] = useState({
    machineName: '',
    machineStatus: '',
    machineModel: '',
    machineHealthScore: 0,
    machineImageUrl: ''
  });

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

  function handleModalPress (machineIndex: number, unityIndex: number) {

    setModalVisibility(!modalVisibility);
    setModalData({
      machineName: receivedData!.unity[unityIndex].machines[machineIndex].name,
      machineStatus: receivedData!.unity[unityIndex].machines[machineIndex].status,
      machineModel: receivedData!.unity[unityIndex].machines[machineIndex].machine_model,
      machineHealthScore: receivedData!.unity[unityIndex].machines[machineIndex].health_score,
      machineImageUrl: receivedData!.unity[unityIndex].machines[machineIndex].image_url
    });

  }


  async function handleSubmit () {

    if (!selectedCompany) return false;

    const { data } = await api.get(`companies/query-one/${selectedCompany}`);
    setReceivedData(data);
    return true;

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
            {receivedData.unity.map((un, unityIndex) => (
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
                    {un.machines.map((machine: MachineProps, machineIndex) => (
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
                          onClick={() => handleModalPress(machineIndex, unityIndex)}
                          onKeyDown={() => handleModalPress(machineIndex, unityIndex)}
                        >
                          <h4>
                            Machine name:
                          </h4>
                          <h4 style={{ marginLeft: 10 }}>
                            {machine.name}
                          </h4>
                        </div>
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
      <CustomModal
        modalVisibility={modalVisibility}
        machineName={modalData.machineName}
        machineStatus={modalData.machineStatus}
        machineModel={modalData.machineModel}
        machineHealthScore={modalData.machineHealthScore}
        machineImageUrl={modalData.machineImageUrl}
        setModalVisibility={setModalVisibility}
      />
    </FormContainer>

  );

};

export default Overview;
