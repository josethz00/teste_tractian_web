import React from 'react';
import './styles.css';


const FormContainer: React.FC = ({ children }) => (

  <div className='form-container'>
    {children}
  </div>

);

export default FormContainer;
