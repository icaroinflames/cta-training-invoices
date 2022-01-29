import React, { useState } from 'react';
import { gql, useMutation} from '@apollo/client';
import TextInput from './customInputs/TextInput';

const MUTATION_REGISTER_USER = gql`
    mutation registerUser($email: String!, $password: String!) {
        insert_user(objects: {email: $email, password: $password}) {
        affected_rows
        }
    }
`;

export default function UserRegister({tokenState, setTokenState}) {

  const [registerUser, {data, loading, error }] = useMutation(MUTATION_REGISTER_USER);

  const initialState = {
    email: '',
    password: '',
    passwordValid: false
  }

  const [formState, setFormState] = useState(initialState)

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = event => {

    event.preventDefault();
    if(formState.passwordValid){
      registerUser({
        variables: formState,
      });
  
      console.log(data);
  
      setFormState(initialState)
    }

  }

  const isPasswordValid = (password2) => {
    return formState.password.length > 5 && formState.password === password2;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput label='Email' onChange={(e) => setFormState({ ...formState, email: e.target.value })}/>
        <TextInput label='Password' onChange={(e) => setFormState({ ...formState, password: e.target.value })}/>
        <TextInput label='Repeat password' onChange={(e) => setFormState({...formState, passwordValid: isPasswordValid(e.target.value)})}/>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}