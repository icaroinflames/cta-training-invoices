import React from 'react';
import { gql, useQuery} from '@apollo/client';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const QUERY_GET_INVOICES = gql`
    query getInvoices {
        invoices {
        created_at
        invoice_id
        total
        user_id
        }
    }
`;

const columns = [
    { field: "invoice_id", hide: true },
    { field: "user_id", hide: true},
    { field: "total", headerName: "Total", width: 150 },
    { field: "created_at", headerName: "Date", width: 150 }
];

export const InvoicesList = () => {

    const {data, loading, error } = useQuery(QUERY_GET_INVOICES);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const rows = data.invoices.reduce( (acc, cur, idx) => [...acc, {...cur, id: idx}] , [] );

    return (
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      );
    
}