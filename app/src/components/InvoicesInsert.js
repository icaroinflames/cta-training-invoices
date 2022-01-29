import React, { useState } from 'react';
import { gql, useMutation} from '@apollo/client';
import TextInput from './customInputs/TextInput';
import NumberInput from './customInputs/NumberInput'

const MUTATION_ADD_INVOICE = gql`
    query loginUser($email: String!, $password: String!) {
        insert_user(objects: {email: $email, password: $password}) {
        affected_rows
        }
    }
`;

const convertToNumber = (number) => {
  if (Number.isNaN(Number.parseFloat(number))) {
    return 0;
  }
  return parseFloat(number) ;
}
export default function AddIvoice({tokenState, setTokenState}) {

  const initialState = {
    NIF: '',
    razonSocial: '',
    cliente: '',
    total: 0
  }

  const [addInvoice, {data, loading, error }] = useMutation(MUTATION_ADD_INVOICE);

  const [formState, setFormState] = useState(initialState)

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = event => {

    event.preventDefault();
    
    addInvoice({
      variables: formState,
    });
  
    console.log(data);
  
    setFormState(initialState)

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput label='NIF' onChange={(e) => setFormState({ ...formState, NIF: e.target.value })}/>
        <TextInput label='razonSocial' onChange={(e) => setFormState({ ...formState, razonSocial: e.target.value })}/>
        <TextInput label='cliente' onChange={(e) => setFormState({ ...formState, cliente: e.target.value })}/>  
        <NumberInput label='total' onChange={(e) => setFormState({ ...formState, cliente: convertToNumber(e.target.value) })}/>  
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
  
}