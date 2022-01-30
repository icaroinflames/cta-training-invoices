import React, { useState } from 'react';
import { gql, useLazyQuery} from '@apollo/client';
import { Link } from "react-router-dom";

import TextInput from './customInputs/TextInput';

const QUERY_LOGIN_USER = gql`
  query getUserId($email: String!, $password: String!) {
    loginUser(arg1: {email: $email, password: $password}) {
      accessToken
    }
  }
`;

export default function UserLogin({tokenState, setTokenState}) {

  const [loginUser, {data, loading, error }] = useLazyQuery(QUERY_LOGIN_USER);

  const initialState = {
    email: '',
    password: '',
  }

  const [formState, setFormState] = useState(initialState);

  const handleSubmit = event => {

    event.preventDefault();
    
    loginUser({
    variables: formState,
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  
    if (data){
      setTokenState(data.accessToken);
    } console.log(JSON.stringify(data));
    
    
    setFormState(initialState)

  }

  const onChangeEmail = (e) => {
    setFormState(...formState, {email: e.target.value});
  }

  const onChangePassword = (e) => {
    setFormState(...formState, {password: e.target.value});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput label='Email' onChange={onChangeEmail}/>
        <TextInput label='Password' onChange={onChangePassword}/>        
        <div>
          <button type="submit">Login</button>
        </div>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
  
}