import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";

import { deleteTraining, getTrainings, getTrainingsWithCustomer } from "../api/trainingapi";
import EditTraining from "./EditTraining";
import AddTraining from "./AddTraining";


function TrainingList() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    const [colDefs, setColDefs] = useState([
        {field: "date", headerName: "Date", sortable: true, filter: true, flex: 1},
        {field: "duration", headerName: "Duration", sortable: true, filter: true, flex: 1},
        {field: "activity", headerName: "Activity", sortable: true, filter: true, flex: 1},
        {field: "customer", headerName: "Customer", sortable: true, filter: true, flex: 1,
            valueGetter: params => {
                const customer = params.data.customer;
                return customer ? `${customer.firstname} ${customer.lastname}` : 'Unknown';
            }
        },
        {
            cellRenderer: params => <EditTraining data={params.data} handleFetch={handleFetch} />
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
            deleteTraining(params.id)
                .then(() => handleFetch())
                .catch(err => console.log(err));
        }
    }

    const handleFetch = () => {
        getTrainingsWithCustomer()
            .then(data => setTrainings(data))
            .catch(err => console.log(err));
    }
    console.log(trainings);
    return(
        <>
            <AddTraining handleFetch={handleFetch} />
            <div className="ag-theme-material" style={{height: 400, width: '90%', margin: 'auto'}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Training deleted"
                />
            </div>
        </>
    )
}

export default TrainingList;