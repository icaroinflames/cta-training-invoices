import { InvoiceNewUI } from "./components/InvoiceNewUI";
import { gql, useMutation} from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const MUTATION_INSERT_INVOICE = gql`
    mutation registerUser($total: numeric!) {
        insert_invoices(objects: {total: $total}) {
        affected_rows
        }
    }
`;


export const InvoicesNew = () => {

  const initialState = {
    total: 0,
  };

  const [formState, setFormState] = useState(initialState);

  const [insertInvoice , {data, loading, error }] = useMutation(MUTATION_INSERT_INVOICE);

  const navigate = useNavigate();

  const onChangeTotal = (value) => setFormState({ ...formState, total: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    insertInvoice({
      variables: formState,
    });
    setFormState(initialState);
  };

  if(loading) return "loading...";
  if(error) return `Error -> ${error.message}`;

  if(data){
    console.log(data);
    navigate('/invoices');
  } 

  const customProps = {
      handleSubmit,
      onChangeTotal
  };

  return <InvoiceNewUI {...customProps} />
};
