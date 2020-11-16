import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';


interface MachineModalProps {

  modalVisibility: boolean;
  machineName: string;
  machineStatus: string;
  machineModel: string;
  machineHealthScore: number;
  machineImageUrl: string;
  setModalVisibility: (modalVisibility: boolean) => void;

}

const CustomModal: React.FC<MachineModalProps> = ({

  modalVisibility,
  machineName,
  machineStatus,
  machineModel,
  machineHealthScore,
  machineImageUrl,
  setModalVisibility


}) => (

  <Modal
    title='Machine info'
    visible={modalVisibility}
    onOk={() => setModalVisibility(!modalVisibility)}
    onCancel={() => setModalVisibility(!modalVisibility)}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p style={{ marginRight: 10 }}>Name: </p>
      <p>{machineName}</p>
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p style={{ marginRight: 10 }}>Status: </p>
      <p>{machineStatus}</p>
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p style={{ marginRight: 10 }}>Model: </p>
      <p>{machineModel}</p>
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p style={{ marginRight: 10 }}>Health score: </p>
      <p>{machineHealthScore}</p>
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
      <img src={machineImageUrl} alt='Foto da máquina' style={{ width: 350, borderRadius: 10 }} />
    </div>
  </Modal>

);

export default CustomModal;
