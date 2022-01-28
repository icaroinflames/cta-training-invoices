import React, { useState } from 'react';
import { gql, useMutation} from '@apollo/client';

const MUTATION_REGISTER_USER = gql`
    mutation registerUser($email: String!, $password: String!) {
        insert_user(objects: {email: $email, password: $password}) {
        affected_rows
        }
    }
`;




export default function UserRegister() {

  const [registerUser, {data, loading, error }] = useMutation(MUTATION_REGISTER_USER);

  const initialState = {
    email: '',
    password: ''
  }

  const [formState, setFormState] = useState(initialState)

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = event => {

    event.preventDefault();

    registerUser({
      variables: formState,
    });

    setFormState(initialState)

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} type="text"></input>
        </label>
        <label>
          <span>Password</span>
          <input value={formState.password} onChange={(e) => setFormState({ ...formState, password: e.target.value })} ></input>
        </label>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}