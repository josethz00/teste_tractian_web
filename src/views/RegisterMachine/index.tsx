import {
  Button,
  Input,
  Select,
  message
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { SelectValue } from 'antd/lib/select';
import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import api from '../../services/api';
import FormContainer from '../../components/FormContainer';
import UploadDropzone from '../../components/UploadDropzone';


interface UnityDataProps {

  _id: string;
  name: string;

}

interface UserDataProps {

  _id: string;
  username: string;

}

const RegisterMachine: React.FC = () => {

  const [unities, setUnities] = useState<UnityDataProps[]>();
  const [users, setUsers] = useState<UserDataProps[]>();
  const [selectedUnity, setSelectedUnity] = useState<string>('0');
  const [selectedUser, setSelectedUser] = useState<string>('0');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedStatus, setSelectedStatus] = useState<string>('0');

  const nameInputRef = useRef<Input>(null);
  const descriptionInputRef = useRef<TextArea>(null);
  const modelInputRef = useRef<Input>(null);
  const healthScoreInputRef = useRef<Input>(null);


  useEffect(() => {

    api.get('unities/index').then((response) => {

      setUnities(response.data);

    }).catch(() => {

      message.error('Network error');

    });

  }, []);

  useEffect(() => {

    api.get('users/index').then((response) => {

      setUsers(response.data);

    });

  }, []);


  function handleChangeUnity (value: SelectValue) {

    setSelectedUnity(value.toString());

  }

  function handleChangeUser (value: SelectValue) {

    setSelectedUser(value.toString());

  }

  function handleChangeStatus (value: SelectValue) {

    setSelectedStatus(value.toString());

  }

  async function handleSubmit () {

    if (
      !nameInputRef.current?.input.value
      || !modelInputRef.current?.input.value
      || !healthScoreInputRef.current?.input.value
      || !selectedStatus
      || !selectedUnity
      || !selectedUser
      || !selectedFile
    ) return false;

    if (
      !descriptionInputRef.current?.state.value
      || descriptionInputRef.current?.state.value.length > 150
    ) return false;

    if (healthScoreInputRef.current.input.value.length > 3) return false;

    if (Number(healthScoreInputRef.current.input.value) > 100) return false;

    const formData = new FormData();

    formData.append('name', nameInputRef.current.input.value);
    formData.append('description', descriptionInputRef.current!.state.value);
    formData.append('machine_model', modelInputRef.current.input.value);
    formData.append('health_score', healthScoreInputRef.current.input.value);
    formData.append('status', selectedStatus);
    formData.append('file', selectedFile);

    try {

      const { data } = await api.post('machines/store', formData, {
        headers: {
          user_id: selectedUser,
          unity_id: selectedUnity
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
      <h1>Machines registration form</h1>
      <Input ref={nameInputRef} placeholder='Machine name' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Input.TextArea ref={descriptionInputRef} placeholder='Machine description' size='large' style={{ width: 500, margin: '20px 0px' }} rows={3} maxLength={150} />
      <UploadDropzone onFileUploaded={setSelectedFile} />
      <Input ref={modelInputRef} placeholder='Machine model' size='large' style={{ width: 500, margin: '20px 0px' }} />
      <Input ref={healthScoreInputRef} placeholder='Health score' size='large' style={{ width: 500, margin: '20px 0px' }} type='number' />
      <Select
        value={selectedUnity}
        onChange={handleChangeUnity}
        size='large'
        style={{ width: 500, margin: '20px 0px' }}
      >
        <Select.Option value='0' disabled>Select a unity</Select.Option>
        {unities?.map((unity: UnityDataProps) => (
          <Select.Option
            key={unity._id}
            value={unity._id}
          >
            {unity.name}
          </Select.Option>
        ))}
      </Select>
      <Select value={selectedUser} onChange={handleChangeUser} size='large' style={{ width: 500, margin: '20px 0px' }}>
        <Select.Option value='0' disabled>Select a responsible user</Select.Option>
        {users?.map((user: UserDataProps) => (
          <Select.Option
            key={user._id}
            value={user._id}
          >
            {user.username}
          </Select.Option>
        ))}
      </Select>
      <Select value={selectedStatus} onChange={handleChangeStatus} size='large' style={{ width: 500, margin: '20px 0px' }}>
        <Select.Option value='0' disabled>Select a status for the machine</Select.Option>
        <Select.Option value='Disponível'>Disponível</Select.Option>
        <Select.Option value='Em manutenção'>Em manutenção</Select.Option>
        <Select.Option value='Desativado'>Desativado</Select.Option>
      </Select>
      <Button size='large' style={{ width: 500 }} onClick={handleSubmit}>
        Register
      </Button>
    </FormContainer>

  );

};

export default RegisterMachine;
