import React, { useState } from 'react';
import { gql, useLazyQuery} from '@apollo/client';
import { Link, useNavigate } from "react-router-dom";

import TextInput from '../customInputs/TextInput';

const QUERY_LOGIN_USER = gql`
  query getUserId($email: String!, $password: String!) {
    loginUser(arg1: {email: $email, password: $password}) {
      accessToken
    }
  }
`;

export const UserLogin = () => {

  const [loginUser, {called, data, loading }] = useLazyQuery(QUERY_LOGIN_USER);

  const initialState = {
    email: '',
    password: '',
  }

  const [formState, setFormState] = useState(initialState);

  const navigate = useNavigate();

  const handleSubmit = event => {

    event.preventDefault();
    
    loginUser({
    variables: formState,
    });

  }

  if (called && loading) return 'Submitting...';

  if(data){
    console.log(JSON.stringify(data));
    localStorage.setItem('token', data.loginUser.accessToken);
    navigate('/invoices')
  } 
  
    
  const onChangeEmail = (value) => {
    setFormState({...formState, email: value});
  }

  const onChangePassword = (value) => {
    setFormState({...formState, password: value});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput label='Email' changeCallback={onChangeEmail}/>
        <TextInput label='Password' changeCallback={onChangePassword}/>        
        <div>
          <button type="submit">Login</button>
        </div>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
  
}