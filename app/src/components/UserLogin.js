import React, { useState } from 'react';
import { gql, useMutation} from '@apollo/client';
import TextInput from './customInputs/TextInput';

const QUERY_LOGIN_USER = gql`
    query loginUser($email: String!, $password: String!) {
        insert_user(objects: {email: $email, password: $password}) {
        affected_rows
        }
    }
`;

export default function UserLogin({tokenState, setTokenState}) {

  const [loginUser, {data, loading, error }] = useMutation(QUERY_LOGIN_USER);

  const [formState, setFormState] = useState(initialState)

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = event => {

    event.preventDefault();
    
    loginUser({
    variables: formState,
    });
  
    console.log(data);
  
    setFormState(initialState)

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput label='Email' onChange={(e) => setFormState({ ...formState, email: e.target.value })}/>
        <TextInput label='Password' onChange={(e) => setFormState({ ...formState, password: e.target.value })}/>        
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
  
}