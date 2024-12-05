import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { getCustomers, deleteCustomer } from "../api/customerapi";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";



function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const [colDefs, setColDefs] = useState([
        { field: "firstname", headerName: "First Name", sortable: true, filter: true, flex: 1 },
        { field: "lastname", headerName: "Last Name", sortable: true, filter: true, flex: 1 },
        { field: "email", headerName: "Email", sortable: true, filter: true, flex: 1 },
        { field: "phone", headerName: "Phone", sortable: true, filter: true, flex: 1 },
        { field: "streetaddress", headerName: "Street Address", sortable: true, filter: true, flex: 1 },
        { field: "postcode", headerName: "Postcode", sortable: true, filter: true, flex: 1 },
        { field: "city", headerName: "City", sortable: true, filter: true, flex: 1 },

        {
            cellRenderer: params => <EditCustomer data={params.data} handleFetch={handleFetch} />
        }, 
       {
            cellRenderer: params => <Button size="small" color="error"
                onClick={() => handleDelete(params.data)}
            >Delete</Button>, flex: 1
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = (params) => {
        if(window.confirm("Are you sure you want to delete?")) {
            setOpen(true);
            deleteCustomer(params._links.customer.href)
                .then(() => handleFetch())
                .catch(err => console.log(err));
        }
    }

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.log(err));
    }

    return (
        <>
            <AddCustomer handleFetch={handleFetch} />
            <div className="ag-theme-material" style={{ height: 400, width: "90%", margin: "auto" }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={true}
                    suppressCellFocus={true}
                />
                <Snackbar
                    open={open}
                    message="Customer deleted"
                    autoHideDuration={3000}
                    onClose={handleClose}
                />
            </div>
        </>
    )

}

export default CustomerList;