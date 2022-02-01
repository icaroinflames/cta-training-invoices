import { InvoiceNewUI } from "./components/InvoiceNewUI";
import { gql, useMutation} from '@apollo/client';
import React, { useState } from 'react';

const MUTATION_INSERT_INVOICE = gql`
    mutation registerUser($total: Number!) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formState.passwordValid) {
      insertInvoice({
        variables: formState,
      });

      setFormState(initialState);
    }
  };

  if(loading) return "loading...";
  if(error) return `Error -> ${error.message}`;

  if(data && data.insert_invoice.affected_rows) {

  }
  const onChangeTotal = (value) => setFormState({ ...formState, total: value });

  const customProps = {
      handleSubmit,
      onChangeTotal
  };

  <InvoiceNewUI {...customProps} />
};
