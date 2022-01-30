import React, { useState } from 'react';
import { gql, useMutation} from '@apollo/client';
import { Link } from "react-router-dom";

import TextInput from './customInputs/TextInput';

const MUTATION_REGISTER_USER = gql`
    mutation registerUser($email: String!, $password: String!) {
        insert_user(objects: {email: $email, password: $password}) {
        affected_rows
        }
    }
`;

export default function UserRegister({tokenState, setTokenState}) {

  const initialState = {
    email: '',
    password: '',
    passwordValid: false
  }

  const [formState, setFormState] = useState(initialState);

  const [registerUser, {data, loading, error }] = useMutation(MUTATION_REGISTER_USER);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  if(data && data.insert_user.affected_rows){
    console.log(data);
    //TODO redirigir a login
  } 

  const handleSubmit = event => {

    event.preventDefault();
    if(formState.passwordValid){
      registerUser({
        variables: formState,
      });
  
      setFormState(initialState)
    }

  }

  const onChangeEmail = (value) => {
    setFormState({...formState,  email: value });
    console.log(formState.email);
  }

  const onChangePassword = (value) => {
    setFormState({...formState, password: value });
  }

  const onChangePassword2 = (value) => {
    setFormState({...formState, passwordValid: isPasswordValid(value)});
  }

  const isPasswordValid = (value) => {
    return (value.length > 5) && value === formState.password;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput label='Email' changeCallback={onChangeEmail}/>
        <TextInput label='Password' changeCallback={onChangePassword}/>
        <TextInput label='Repeat password' changeCallback={onChangePassword2}/>
        <div>
          <button type="submit">Register</button>
        </div>
        <Link to="/login">Login</Link>
      </form>
    </div>
  )
}