import React, { useState } from 'react';
import { gql, useMutation} from '@apollo/client';
import { UserRegisterUI } from './components/UserRegisterUI';


const MUTATION_REGISTER_USER = gql`
    mutation registerUser($email: String!, $password: String!) {
        insert_user(objects: {email: $email, password: $password}) {
        affected_rows
        }
    }
`;

export const UserRegister = () => {

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

  const customProps = {
    onChangeEmail,
    onChangePassword,
    onChangePassword2,
    handleSubmit
  }

  return <UserRegisterUI {...customProps} />

}